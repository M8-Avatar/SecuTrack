# CASE-AUTH-04 — Cycle de vie du mot de passe

**Trace :** SPEC-AUTH-04
**Description :** Vérifier le changement forcé du mot de passe provisoire à la première connexion, la réinitialisation par un administrateur, et l'absence de réinitialisation en libre-service.

- Scénario 1 : Changement forcé à la première connexion
  - Entrée : un compte créé par un administrateur avec le mot de passe provisoire "ProvisoireTemp12". L'utilisateur se connecte avec ce mot de passe.
  - Résultat attendu : avant tout accès à l'application, le système impose la saisie d'un nouveau mot de passe. Un mot de passe de moins de 12 caractères est refusé (même politique de longueur minimale que pour toute définition de mot de passe) ; un mot de passe conforme est accepté et remplace le provisoire.
- Scénario 2 : Réinitialisation par un administrateur
  - Entrée : un administrateur réinitialise l'accès d'un contributeur ayant perdu son mot de passe.
  - Résultat attendu : un nouveau mot de passe provisoire est généré ; à sa prochaine connexion, le contributeur est de nouveau contraint d'en définir un nouveau (retour au scénario 1).
- Scénario 3 : Pas de réinitialisation en libre-service
  - Entrée : un visiteur non authentifié clique sur "Mot de passe oublié ?" depuis la page de connexion.
  - Résultat attendu : le système affiche une invitation à contacter l'administrateur ; aucun formulaire de réinitialisation autonome (ni envoi d'e-mail) n'est proposé.
