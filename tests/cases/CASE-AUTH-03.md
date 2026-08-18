# CASE-AUTH-03 — Limite stricte de 2 administrateurs

**Trace :** SPEC-AUTH-01
**Description :** Vérifier l'impossibilité métier de dépasser le quota de deux comptes administrateurs.

- Scénario 1 : Ajout d'un deuxième administrateur (Acceptation)
  - Prérequis : 1 seul utilisateur « Administrateur » existe en base (Julien).
  - Entrée : Julien crée le compte du Trésorier en sélectionnant le rôle « Administrateur ».
  - Résultat attendu : Succès de la création. La limite n'est pas atteinte.
- Scénario 2 : Tentative d'ajout d'un troisième administrateur (Rejet)
  - Prérequis : 2 utilisateurs « Administrateur » existent déjà en base (Julien, Trésorier).
  - Entrée : L'interface de création d'utilisateur est ouverte. Tentative de sélection du rôle « Administrateur ».
  - Résultat attendu : L'option « Administrateur » est grisée ou absente de la liste. Si la requête est forcée manuellement (par API ou modification du DOM), le système la rejette avec une erreur de validation claire (« Le nombre maximum d'administrateurs est déjà atteint »).