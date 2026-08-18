/**
 * Composant d'accès aux données NoSQL — journal d'activité (ADR-003).
 *
 * Le journal (ActionLog) ne passe pas par Prisma : il est stocké dans MongoDB,
 * collection "action_logs", et accédé via le driver `mongodb` natif.
 *
 * Rappel ADR-003 : `actionId` et `authorId` sont des références APPLICATIVES,
 * non contraintes par la base. Aucune clé étrangère ne garantit qu'elles
 * désignent une ligne existante de `actions` / `users` dans PostgreSQL.
 * L'écriture est ordonnée « log d'abord » : la collection peut donc contenir
 * des logs orphelins (tentative de création n'ayant pas abouti), à filtrer en
 * lecture par l'appelant. Un log n'est jamais modifié ni supprimé.
 */

import { MongoClient, type Collection, type Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    'MONGODB_URI est absente de l\'environnement. Voir .env.example.'
  );
}

const COLLECTION_NAME = 'action_logs';

/**
 * Pattern singleton recommandé pour Next.js.
 *
 * En développement, le hot-reload réévalue les modules à chaque modification :
 * sans mise en cache, chaque rechargement ouvrirait un nouveau pool de
 * connexions et épuiserait le serveur MongoDB. On conserve donc la promesse de
 * connexion sur l'objet global, qui lui survit au hot-reload.
 *
 * En production, le module n'est évalué qu'une fois : la variable de module
 * suffit et on n'encombre pas l'objet global.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

/** Base de données ciblée : celle indiquée dans le chemin de MONGODB_URI. */
async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}

/** Structure d'un document de la collection "action_logs". */
export interface ActionLogDocument {
  actionId: string;
  authorId: string;
  eventType: string;
  description: string;
  timestamp: Date;
}

/** Accès typé à la collection du journal. */
async function getActionLogs(): Promise<Collection<ActionLogDocument>> {
  const db = await getDb();
  return db.collection<ActionLogDocument>(COLLECTION_NAME);
}

/**
 * Écrit un document dans la collection "action_logs".
 *
 * Écriture seule : le journal est append-only, aucun update ni delete n'est
 * exposé ici. Conformément à l'ordre « log d'abord » (ADR-003), l'appelant
 * invoque cette fonction AVANT de créer l'Action correspondante dans PostgreSQL.
 *
 * @param log document à insérer
 * @returns l'identifiant MongoDB (_id) du document inséré, en chaîne
 */
export async function createActionLog(log: ActionLogDocument): Promise<string> {
  const collection = await getActionLogs();
  const result = await collection.insertOne(log);
  return result.insertedId.toString();
}

/**
 * Récupère les logs d'une action, triés par `timestamp` croissant
 * (du plus ancien au plus récent).
 *
 * @param actionId identifiant PostgreSQL de l'action (référence applicative)
 * @returns les documents du journal, éventuellement vide
 */
export async function getLogsByAction(
  actionId: string
): Promise<ActionLogDocument[]> {
  const collection = await getActionLogs();
  return collection.find({ actionId }).sort({ timestamp: 1 }).toArray();
}
