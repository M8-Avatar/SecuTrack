# Modèle Logique de Données (MLD) — SecuTrack

**Notation :** standard relationnel.
**Légende :** PK = clé primaire, les clés étrangères sont préfixées par `#`.

## Énumérations et domaines de valeurs

- **RoleType** : `ENUM('ADMIN', 'CONTRIBUTOR')`
- **StatusType** : `ENUM('TODO', 'IN_PROGRESS', 'DONE')`
- **Scale1To4** : `INTEGER CHECK (value BETWEEN 1 AND 4)`

## Relations (tables)

**users** (
  PK id : UUID,
  firstName : VARCHAR,
  lastName : VARCHAR,
  email : VARCHAR [UNIQUE],
  passwordHash : VARCHAR,
  role : RoleType [DEFAULT 'CONTRIBUTOR'],
  isActive : BOOLEAN [DEFAULT TRUE],
  createdAt : TIMESTAMP,
  updatedAt : TIMESTAMP
)

**assets** (
  PK id : UUID,
  name : VARCHAR,
  type : VARCHAR,
  isSensitive : BOOLEAN [DEFAULT FALSE],
  impactLevel : Scale1To4,
  archivedAt : TIMESTAMP [NULL],
  createdAt : TIMESTAMP,
  updatedAt : TIMESTAMP
)

**risks** (
  PK id : UUID,
  description : TEXT,
  probability : Scale1To4,
  impact : Scale1To4,
  #assetId : UUID [FK → assets.id],
  archivedAt : TIMESTAMP [NULL],
  createdAt : TIMESTAMP,
  updatedAt : TIMESTAMP
)

**actions** (
  PK id : UUID,
  title : VARCHAR,
  status : StatusType [DEFAULT 'TODO'],
  dueDate : DATE,
  #riskId : UUID [FK → risks.id],
  #assigneeId : UUID [FK → users.id],
  archivedAt : TIMESTAMP [NULL],
  createdAt : TIMESTAMP,
  updatedAt : TIMESTAMP
)

> La table `action_logs` ne figure plus ici : le journal d'activité a migré vers MongoDB (voir ADR-003 et la section « Journal d'activité » ci-dessous).

## Journal d'activité (NoSQL — MongoDB)

Décision : ADR-003 (persistance polyglotte). Le journal quitte le modèle relationnel pour une base documentaire, accédée via le driver `mongodb` natif — pas via Prisma.

**Collection `action_logs`** — un document par événement, *append-only* et strictement immuable (ni mise à jour, ni suppression, ni archivage logique).

```json
{
  "_id":         "ObjectId",
  "actionId":    "string",
  "authorId":    "string",
  "eventType":   "string",
  "description": "string",
  "timestamp":   "Date"
}
```

| Champ | Type | Rôle |
|---|---|---|
| `_id` | ObjectId | Identifiant du document, généré par MongoDB. |
| `actionId` | string | **Référence applicative** vers `actions.id` (PostgreSQL). |
| `authorId` | string | **Référence applicative** vers `users.id` (PostgreSQL). |
| `eventType` | string | Nature de l'événement journalisé. |
| `description` | string | Texte libre décrivant l'événement. |
| `timestamp` | Date | Horodatage de l'événement ; clé de tri du journal (croissant). |

**Références non contraintes.** `actionId` et `authorId` ne sont **pas** des clés étrangères : aucune contrainte de base ne garantit qu'elles désignent une ligne existante de `actions` ou de `users`. L'intégrité de ces liens est **applicative**, portée par l'ordre d'écriture « log d'abord » retenu en ADR-003 : le document est inséré dans MongoDB avant la création de l'Action dans PostgreSQL. Conséquence assumée : la collection peut contenir des **logs orphelins** (trace d'une tentative de création n'ayant pas abouti), que toute lecture doit filtrer ou signaler comme telles — jamais supprimer.

## Règles de passage (traduction du MCD)

1. Relation « menace » (Asset 1-N Risk) : la table `risks` reçoit la clé étrangère `#assetId`.
2. Relation « traite » (Risk 1-N Action) : la table `actions` reçoit la clé étrangère `#riskId`.
3. Relation « est assigné à » (User 1-N Action) : la table `actions` reçoit la clé étrangère `#assigneeId`.
4. Relation « possède historique » (Action 1-N ActionLog) : **ne suit plus les règles de passage relationnelles.** L'entité ActionLog est traduite en collection documentaire `action_logs`, et la cardinalité 1-N est portée par le champ `actionId` répété dans chaque document — une référence applicative, sans clé étrangère.
5. Relation « déclenche » (User 1-N ActionLog) : idem, portée par le champ `authorId` du document.

> Règles 4 et 5 : le passage MCD → MLD s'arrête au périmètre relationnel. Les deux relations impliquant ActionLog sont traduites hors du modèle relationnel, sans intégrité référentielle garantie par la base (ADR-003).

## Contraintes d'intégrité référentielle

- Toutes les clés étrangères du modèle relationnel (`#assetId`, `#riskId`, `#assigneeId`) sont configurées en **RESTRICT** à la suppression.
- **Justification** : outil de traçabilité. Aucune donnée historique (risque, action) ne doit être supprimée par effet de cascade. La suppression s'effectue via un masquage logique (`archivedAt` ou `isActive`).
- **Hors périmètre relationnel** : les références `actionId` et `authorId` du journal MongoDB ne sont couvertes par aucune de ces contraintes (voir la section « Journal d'activité » et ADR-003).
- **Note d'immuabilité** : la collection `action_logs` ne possède ni `archivedAt` ni `updatedAt` — un log est strictement immuable une fois créé (cohérent avec SPEC-ACTION-03).