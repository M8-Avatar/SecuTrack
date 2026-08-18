# CASE-ACTION-01 — Étanchéité de la vue Contributeur

**Trace :** SPEC-ACTION-01
**Description :** Vérifier que les requêtes filtrent strictement les plans d'action selon l'utilisateur connecté.

- Prérequis : L'Admin a créé : Action A (assignée à Thomas), Action B (assignée à Thomas), Action C (assignée à Julien).
- Entrée : L'utilisateur « Thomas » se connecte et affiche la liste des actions.
- Résultat attendu : Seules l'Action A et l'Action B sont affichées à l'écran. L'Action C est bloquée par les règles d'accès des données.