# ADR-003 — Persistance polyglotte (PostgreSQL + MongoDB)

**Statut :** proposé
**Date :** 18 août 2026
**Décidé par :** Arnaud Bidel

Ce document fait évoluer `ADR-002-persistance` sur le seul périmètre du journal d'activité. Le reste d'ADR-002 (PostgreSQL pour le cœur relationnel) demeure en vigueur.

## 1. Contexte

`ADR-002` a tranché en faveur d'un modèle **100 % relationnel**. Son raisonnement partait d'une chaîne de dépendances stricte (Actif → Risque → Action → Journal) et d'une exigence absolue de traçabilité (CR-01/Q06, CR-01/Q11) : le paradigme SQL « s'imposait de lui-même », et la question du NoSQL n'y a pas été instruite. Le journal d'activité y était donc une table de plus, `action_logs`, avec ses clés étrangères en `RESTRICT`.

Trois éléments conduisent à rouvrir ce point, uniquement pour le journal :

1. **Le journal n'a pas la même nature que le reste du modèle.** `action_logs` est *append-only* et strictement immuable : ni `updatedAt`, ni `archivedAt` (voir la note d'immuabilité du MLD, cohérente avec SPEC-ACTION-03). Il ne participe à aucune mise à jour, à aucun soft-delete, à aucune contrainte métier de cohérence. C'est un flux d'événements horodatés — cas d'usage documentaire classique.
2. **Volumétrie et structure divergent du cœur relationnel.** Le cœur reste petit et stable (quelques dizaines d'actifs, une centaine de risques). Le journal, lui, croît linéairement avec l'usage et sans borne, et son champ `description` est un texte libre dont la forme variera selon le type d'événement — une structure de document, pas de tuple.
3. **Couverture des compétences visées.** Le référentiel attend la démonstration de composants d'accès aux données **SQL et NoSQL**. Un modèle mono-paradigme ne permet pas de la produire.

L'exigence de traçabilité de CR-01/Q06 et CR-01/Q11 n'est pas relâchée : elle est déplacée d'une garantie de base de données vers une garantie applicative, explicitée en §5.

## 2. Options envisagées

### Option A — Tout PostgreSQL, journal en table (situation ADR-002)

| | |
|---|---|
| Ce qu'elle facilite | L'atomicité. La création d'une Action et de son premier log tiennent dans une seule transaction (`prisma.$transaction`) : impossible d'obtenir l'une sans l'autre. La clé étrangère `action_logs.actionId` en `RESTRICT` interdit par construction le log orphelin. Un seul SGBD à provisionner, sauvegarder et surveiller. |
| Ce qu'elle coûte | Une table dont le profil d'accès (écriture seule, lecture par `actionId`, croissance non bornée) ne ressemble à aucune autre du schéma, et qui grossit indéfiniment dans la base transactionnelle. |
| Ce qu'elle rend difficile | La démonstration de la compétence NoSQL attendue par le référentiel, qui reste sans support dans le projet. |

### Option B — Polyglotte : PostgreSQL pour le cœur, MongoDB pour le journal *(retenue)*

| | |
|---|---|
| Ce qu'elle facilite | Le stockage d'un flux d'événements dans le paradigme qui lui correspond (document, schéma souple, insertion en fin). Le cœur relationnel reste intact sous Prisma. La compétence « composants d'accès aux données NoSQL » est démontrée sur un cas d'usage réel du projet, et non sur un prétexte. |
| Ce qu'elle coûte | **La perte de l'atomicité entre les deux bases** : aucune transaction ne peut couvrir une écriture PostgreSQL et une écriture MongoDB. Un second SGBD à provisionner et à configurer (`MONGODB_URI`). Un second composant d'accès à maintenir, hors Prisma (driver `mongodb` natif). |
| Ce qu'elle rend difficile | Toute requête qui joindrait le journal au cœur relationnel : elle devient une jointure applicative, en deux temps, à la charge du code. |

## 3. Décision

Choix de l'**Option B**.

- `User`, `Asset`, `Risk`, `Action` restent sur **PostgreSQL**, accédés via **Prisma** (ADR-001, ADR-002).
- Le journal d'activité migre vers **MongoDB**, dans la collection `action_logs`, accédée via le **driver `mongodb` natif** — délibérément pas via Prisma, afin que le composant d'accès NoSQL soit écrit et lisible en tant que tel.
- Le modèle `ActionLog` et ses relations sont retirés de `prisma/schema.prisma`.
- L'écriture est **ordonnée « log d'abord »** : le document est inséré dans MongoDB **avant** la création de l'Action dans PostgreSQL.

## 4. Raisons

1. **L'ordre d'écriture choisit quelle défaillance on accepte.** Deux écritures non atomiques peuvent échouer entre les deux. Écrire l'Action d'abord expose au scénario « action sans trace » : une action existe dans l'outil sans qu'aucun élément n'indique qui l'a créée ni quand — c'est exactement la perte que CR-01/Q06 et CR-01/Q11 interdisent. Écrire le log d'abord expose au scénario inverse, « log sans action » : la trace d'une tentative de création qui n'a pas abouti. Pour un outil d'audit, une tentative tracée est une information, pas une corruption. On retient donc l'ordre qui rend impossible la seule défaillance inacceptable.
2. **Le journal correspond au modèle documentaire, pas au modèle relationnel.** Immuable, sans mise à jour, sans soft-delete, lu presque exclusivement par `actionId` et trié par `timestamp` : ce profil ne tire aucun bénéfice des garanties relationnelles qu'il paie.
3. **Le cas d'usage NoSQL est authentique.** La compétence est démontrée sur la partie du domaine qui la justifie réellement, sans déplacer artificiellement des données dont la cohérence relationnelle est essentielle. Le cœur transactionnel — celui où une jointure manquante détruirait la valeur de l'outil — n'est pas touché.

**Évolution envisagée mais non retenue : l'outbox pattern.** L'écriture du log serait consignée dans une table PostgreSQL au sein de la transaction métier, puis relayée vers MongoDB par un processus asynchrone avec réessai — ce qui restaurerait une garantie de livraison sans transaction distribuée. Écarté ici comme sur-ingénierie : cela suppose un processus de relais, une supervision et une gestion d'échecs disproportionnés au regard de la volumétrie attendue (quelques dizaines d'actifs, une centaine de risques). Le mécanisme est mentionné pour rester disponible si l'hypothèse de volumétrie ou de criticité tombe (voir §6).

## 5. Conséquences acceptées

- **Perte de l'atomicité inter-bases.** Aucune transaction ne couvre PostgreSQL et MongoDB. La séquence « écrire le log, puis créer l'Action » n'est pas un tout-ou-rien : elle peut s'interrompre entre les deux écritures.
- **L'invariante devient applicative, plus transactionnelle.** « Pas d'action sans log » n'est plus garantie par le SGBD mais par l'ordre d'écriture imposé dans le code. Elle ne tient qu'aussi longtemps que tout chemin de création d'Action respecte cet ordre : c'est une discipline de code, vérifiable par revue et par test, non par contrainte de base.
- **La référence Action → log n'est plus contrainte par la base.** `actionId` et `authorId` deviennent de simples chaînes dans le document MongoDB. Aucune clé étrangère, aucun `RESTRICT` : rien n'empêche techniquement un `actionId` de ne désigner aucune ligne de `actions`.
- **Les logs orphelins doivent être filtrés ou ignorés en lecture.** Conséquence directe du point précédent et de l'ordre d'écriture retenu : la collection peut légitimement contenir des logs dont l'Action n'a jamais été créée. Toute lecture qui présente le journal à l'utilisateur doit les écarter, ou les afficher explicitement comme tentatives non abouties. Ils ne sont jamais supprimés — un log reste immuable.
- **Les jointures journal ↔ cœur relationnel deviennent applicatives.** Reconstituer « les actions d'un utilisateur avec leur historique » demande deux requêtes et un rapprochement en mémoire, à la charge du code.
- **Un second SGBD à exploiter.** Provisionnement, variable `MONGODB_URI`, sauvegarde et restauration du journal séparées de celles du cœur — une restauration cohérente des deux bases à un instant donné n'est plus garantie.

## 6. Ce qui nous ferait revenir dessus

- **Une montée en criticité du journal imposant une atomicité forte.** Si le journal acquiert une valeur probante telle qu'un log orphelin, ou une action dont le log manque parce que la seconde écriture a échoué, devient inacceptable — par exemple une obligation réglementaire de complétude vérifiable —, alors l'invariante applicative ne suffit plus. Deux issues : implémenter l'**outbox pattern** décrit en §4 pour garantir la livraison, ou revenir au **tout-relationnel** d'ADR-002 en réintégrant `action_logs` dans PostgreSQL, ce qui restaure l'atomicité et la clé étrangère au prix de la couverture NoSQL.
- **Une volumétrie du journal qui resterait négligeable après mise en service.** Si l'usage réel montre un journal comparable en taille au cœur relationnel, la raison n° 2 du §4 s'effondre et le coût d'exploitation d'un second SGBD n'est plus justifié.
