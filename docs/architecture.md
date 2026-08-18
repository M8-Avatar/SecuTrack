
**Stack :** Next.js / TypeScript full-stack (ADR-001), PostgreSQL via Prisma (ADR-002)
**Type :** application web monolithique modulaire, rendu et logique côté serveur

## 1. Vue d'ensemble

SecuTrack est une application Next.js (App Router) où l'interface et la logique serveur cohabitent dans un même dépôt. Le rendu et les traitements sensibles s'exécutent côté serveur ; le navigateur ne reçoit que ce que son rôle l'autorise à voir.

Voir le diagramme des composants : `docs/uml/architecture.puml`.

## 2. Découpage en couches

L'application est organisée en couches, du plus proche de l'utilisateur au plus proche des données :

| Couche | Rôle | Où (Next.js) |
|---|---|---|
| Présentation | Affichage, formulaires, feu tricolore | Composants React (Server + Client Components) |
| Application / Contrôle | Point d'entrée des actions utilisateur, vérification des droits, validation | Server Actions / Route Handlers |
| Domaine / Métier | Règles métier : calcul de criticité, majoration R-04, catégorisation | Modules de service TypeScript (`/lib/domain`) |
| Accès aux données | Requêtes, transactions, filtrage soft-delete | Prisma Client (`/lib/db`) |
| Persistance | Stockage relationnel | PostgreSQL |

**Décision structurante :** la logique métier (calcul de criticité SPEC-RISK-01/03, majoration R-04) est isolée dans la couche Domaine, indépendamment du framework. Elle ne dépend ni de Prisma ni de Next.js — ce qui la rend testable unitairement (cohérent avec la stratégie de test) et protège contre le couplage fort identifié comme coût dans l'ADR-001.

## 3. Application du cloisonnement (REQ-102, R-03)

L'étanchéité des données du Contributeur est garantie à chaque accès aux données (couche Application / Accès aux données), le middleware Next.js n'étant qu'une première barrière de routage.

**Le rôle du Middleware (barrière périphérique) :** il intercepte les requêtes entrantes pour vérifier l'existence d'une session valide. Il redirige les utilisateurs non authentifiés vers `/login`. Il agit également en garde-fou statique : si un utilisateur avec le rôle CONTRIBUTOR tente d'accéder à la route `/risks` ou `/assets`, le middleware bloque la navigation et le redirige immédiatement.

**Le rôle des Server Actions (barrière absolue) :** c'est ici que l'étanchéité réelle (REQ-102) est assurée. Lors d'une requête de données (ex : charger les actions), le serveur récupère l'identifiant de l'utilisateur de manière sécurisée depuis son token de session serveur (jamais depuis une charge utile envoyée par le client). Si le rôle est CONTRIBUTOR, la requête Prisma force systématiquement le filtre `WHERE assigneeId = session.userId`. Il est impossible pour le serveur de récupérer une ligne qui n'appartient pas à ce contributeur.

**Pourquoi la sécurité ne repose pas sur le client :** masquer un élément en React (ex : `if (isAdmin) return <RiskList />`) ne protège en rien les données si le serveur envoie tout le JSON au navigateur. Dans notre architecture, la donnée n'est envoyée au client qu'après avoir passé le filtre de la Server Action. Le navigateur ignore purement et simplement l'existence des données globales.

## 4. Le calcul métier n'est pas persisté

Conformément aux décisions de modélisation, la criticité, la catégorie et le statut « en retard » ne sont jamais stockés : ils sont calculés à la volée dans la couche Domaine à partir des données brutes (probability, impact, isSensitive, dueDate).

Voir le diagramme de séquence : `docs/uml/sequences/calcul-criticite-rgpd.puml`.

## 5. Transaction et invariante de traçabilité

La création d'une Action et de son premier ActionLog s'effectue dans une transaction unique (`prisma.$transaction`). Cette garantie technique honore l'invariante de traçabilité stricte définie lors de la modélisation du domaine (aucune action ne peut exister sans la trace de son créateur).

Voir le diagramme de séquence : `docs/uml/sequences/creer-action-avec-log.puml`.

## 6. Arborescence cible du code

L'organisation du dépôt reflète strictement le découpage en couches pour empêcher le couplage accidentel.

/
├── src/
│ ├── app/ # Couche Présentation (Pages, Composants UI, Layouts)
│ │ ├── (auth)/ # Vues d'authentification
│ │ ├── dashboard/ # Vues Administrateur (Cartographie, Risques)
│ │ └── actions/ # Vues Contributeur (ses propres tâches)
│ │
│ └── lib/
│ ├── actions/ # Couche Application : Server Actions (contrôle d'accès, DB)
│ ├── auth/ # Fonctions utilitaires de session et vérification RBAC
│ ├── db/ # Couche Accès aux données : instance Prisma (soft-delete)
│ └── domain/ # Couche Métier pure : TypeScript standard, SANS dépendances
│ ├── risk/ # Ex : calculateRiskCriticality(prob, impact, isSensitive)
│ └── action/ # Ex : checkActionOverdue(dueDate, currentDate)
│
└── prisma/
├── schema.prisma # MLD physique
└── migrations/ # Historique des évolutions de la base


## 7. Conséquences et points de vigilance

**Le coût du soft-delete :** imposé par ADR-002, il oblige à filtrer `archivedAt IS NULL` ou `isActive = true` à chaque lecture dans `/lib/db`.

**Préservation du Domaine :** le couplage Next.js / logique doit être contenu par la séparation stricte des couches (ADR-001). Les fonctions présentes dans `/lib/domain/` ne doivent jamais importer `prisma` ni `react`. Elles prennent des primitives en entrée et retournent des valeurs métier en sortie, garantissant leur testabilité (TDD facilité).