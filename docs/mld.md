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

**action_logs** (
  PK id : UUID,
  timestamp : TIMESTAMP [DEFAULT NOW],
  eventType : VARCHAR,
  description : TEXT,
  #actionId : UUID [FK → actions.id],
  #authorId : UUID [FK → users.id]
)

## Règles de passage (traduction du MCD)

1. Relation « menace » (Asset 1-N Risk) : la table `risks` reçoit la clé étrangère `#assetId`.
2. Relation « traite » (Risk 1-N Action) : la table `actions` reçoit la clé étrangère `#riskId`.
3. Relation « est assigné à » (User 1-N Action) : la table `actions` reçoit la clé étrangère `#assigneeId`.
4. Relation « possède historique » (Action 1-N ActionLog) : la table `action_logs` reçoit la clé étrangère `#actionId`.
5. Relation « déclenche » (User 1-N ActionLog) : la table `action_logs` reçoit la clé étrangère `#authorId`.

## Contraintes d'intégrité référentielle

- Toutes les clés étrangères (`#assetId`, `#riskId`, `#assigneeId`, `#actionId`, `#authorId`) sont configurées en **RESTRICT** à la suppression.
- **Justification** : outil de traçabilité. Aucune donnée historique (risque, action, log) ne doit être supprimée par effet de cascade. La suppression s'effectue via un masquage logique (`archivedAt` ou `isActive`).
- **Note d'immuabilité** : la table `action_logs` ne possède ni `archivedAt` ni `updatedAt` — un log est strictement immuable une fois créé (cohérent avec SPEC-ACTION-03).