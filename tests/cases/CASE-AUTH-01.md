# CASE-AUTH-01 — Limites de longueur du mot de passe

**Trace :** SPEC-AUTH-02
**Description :** Vérifier que la politique de sécurité des mots de passe (minimale mais sans contrainte de complexité) est appliquée aux frontières exactes.

- Scénario 1 : Valeur limite inférieure (Rejet)
  - Entrée : Mot de passe de 11 caractères (ex : `azertyuiop1`).
  - Résultat attendu : Rejet de la saisie, affichage d'une erreur « Le mot de passe doit contenir au moins 12 caractères ».
- Scénario 2 : Valeur frontière exacte (Acceptation)
  - Entrée : Mot de passe de 12 caractères (ex : `azertyuiop12`).
  - Résultat attendu : Succès de la validation. Le compte est créé.
- Scénario 3 : Valeur nominale sans caractères spéciaux (Acceptation)
  - Entrée : Mot de passe de 17 caractères, uniquement des lettres (ex : `monmotdepasselong`).
  - Résultat attendu : Succès de la validation. Preuve que la longueur prime sur la complexité arbitraire.