# ADR-002 — Choix de la persistance (Base de données)

**Statut :** proposé
**Date :** 18 août 2026
**Décidé par :** Arnaud Bidel

Ce document justifie le choix du système de gestion de base de données (SGBD) suite à la validation du Modèle Conceptuel de Données (MCD).

## 1. Contexte

SecuTrack est un outil d'analyse de risques et de suivi d'actions. L'analyse du MCD révèle :

- **Un modèle de données hautement relationnel** : une chaîne de dépendances stricte (Actif → Risque → Action → Journal), où la cohérence des liens est primordiale.
- **Une exigence absolue de traçabilité** (CR-01/Q06, CR-01/Q11) : la perte d'un lien (une action orpheline de son risque, un log orphelin de son auteur) détruit la valeur juridique et réglementaire de l'outil.
- **Une volumétrie faible** : quelques dizaines d'actifs, une centaine de risques maximum par association. Aucun besoin de scalabilité horizontale massive.

Le choix du paradigme relationnel (SQL) s'impose de lui-même. Le débat porte sur le moteur SQL à privilégier.

## 2. Options envisagées

### Option A — Base de données locale intégrée (SQLite)

| | |
|---|---|
| Ce qu'elle facilite | L'hébergement et le déploiement à coût zéro absolu. La base est un simple fichier local, idéal pour une architecture minimaliste et la faible volumétrie attendue. |
| Ce qu'elle coûte | Une gestion de la concurrence limitée (verrous en écriture au niveau du fichier complet). |
| Ce qu'elle rend difficile | Les migrations de schéma. Avec Prisma, la modification de colonnes existantes sous SQLite oblige souvent à recréer entièrement la table, ce qui est risqué pour un outil où l'historique d'audit est critique. Limite aussi l'hébergement serverless (système de fichiers éphémère). |

### Option B — Base de données relationnelle robuste (PostgreSQL)

| | |
|---|---|
| Ce qu'elle facilite | L'intégrité référentielle forte via les clés étrangères, une concurrence optimale, un typage strict et des contraintes natives (ex : CHECK). Parfaitement supportée par les migrations Prisma. |
| Ce qu'elle coûte | La nécessité de provisionner un service distant ou un conteneur dédié, ajoutant une légère complexité de déploiement par rapport à un simple fichier. |
| Ce qu'elle rend difficile | Le déploiement dans un environnement totalement déconnecté (offline-first). |

## 3. Décision

Choix de l'**Option B : PostgreSQL**.

## 4. Raisons

1. **Fiabilité des migrations** : l'historique d'audit (ActionLog) étant le cœur de la valeur de l'outil, on ne peut pas risquer de pertes liées aux limitations de migration de SQLite. PostgreSQL gère les évolutions de schéma (Prisma Migrate) de manière fluide et transactionnelle.
2. **Sécurité des données (intégrité)** : les clés étrangères SQL et les règles `RESTRICT` garantissent qu'aucune donnée historique ne pourra être accidentellement effacée.
3. **Écosystème et hébergement (Contrainte n°4)** : bien que nécessitant un serveur contrairement à SQLite, PostgreSQL est le standard de l'industrie, avec de nombreuses options d'hébergement gratuites ou à très bas coût (Neon, Supabase, Vercel Postgres) parfaitement compatibles avec l'architecture Next.js (ADR-001).

## 5. Conséquences acceptées

- **Le coût du soft-delete** : pour préserver l'historique, on a opté pour une suppression logique (`archivedAt`, `isActive`) couplée à des clés étrangères en `RESTRICT`. La conséquence assumée est une surcharge de la logique applicative : chaque requête de lecture devra explicitement filtrer `WHERE archivedAt IS NULL`. C'est le prix à payer pour ne jamais perdre l'audit.

## 6. Ce qui nous ferait revenir dessus

- Un renoncement majeur du client à son besoin de multi-accès (navigateur + smartphone bénévole) au profit d'une installation locale et 100 % déconnectée. Cela annulerait la contrainte d'accessibilité web et rendrait SQLite pertinent pour un déploiement « en un clic » — mais ce scénario impliquerait de réécrire le cahier des charges initial.