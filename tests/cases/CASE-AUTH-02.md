# CASE-AUTH-02 — Cloisonnement absolu du Contributeur

**Trace :** SPEC-AUTH-03
**Description :** S'assurer qu'un compte contributeur ne peut en aucun cas forcer l'accès à la cartographie globale.

- Entrée : Utilisateur authentifié avec le rôle « Contributeur ». Navigation forcée (par saisie dans la barre d'adresse) vers l'URL des risques ou des actifs.
- Résultat attendu : Interception par les règles d'autorisation. Redirection immédiate vers l'accueil ou affichage d'un message « Accès refusé » bloquant le chargement des données métier.