# Spécifications Fonctionnelles — Domaine AUTH (Authentification & Autorisation)

**Domaine :** Authentification, Gestion des profils et Cloisonnement des accès
**Exigences couvertes :** R-01, R-02, R-03, REQ-102, REQ-103, REQ-104, REQ-105

## SPEC-AUTH-01 : Création de compte centralisée

**Traçabilité :** R-01, R-02, REQ-103
**Description :** Le système ne propose aucune route publique d'inscription. Seuls les administrateurs peuvent provisionner de nouveaux comptes. Le nombre d'administrateurs actifs est bloqué à 2 maximum.

**Critères d'acceptation**

- Scénario 1 : Blocage de l'inscription publique
  - Étant donné un visiteur non authentifié
  - Quand il tente d'accéder à l'URL `/register` ou toute autre route d'inscription
  - Alors le système le redirige systématiquement vers la page de connexion (`/login`).
- Scénario 2 : Création d'un contributeur par un admin
  - Étant donné l'administrateur « Julien » connecté
  - Quand il soumet le formulaire de création d'utilisateur avec le rôle « Contributeur »
  - Alors le compte est créé dans le système.
  - Et l'interface lui demande de définir un mot de passe provisoire à communiquer lui-même au bénévole (aucun envoi d'email automatique).
- Scénario 3 : Limite de deux administrateurs (R-02)
  - Étant donné 2 utilisateurs existants avec le rôle « Administrateur »
  - Quand Julien tente de créer un nouvel utilisateur avec le rôle « Administrateur »
  - Alors l'interface désactive cette option et le système retourne une erreur de validation métier.

## SPEC-AUTH-02 : Politique de mots de passe et minimisation (RGPD)

**Traçabilité :** REQ-104, REQ-105
**Description :** Les profils utilisateurs sont limités au strict nécessaire et protégés par un mot de passe long mais sans complexité forcée.

**Critères d'acceptation**

- Scénario 1 : Validation de la complexité du mot de passe (REQ-104)
  - Étant donné un utilisateur définissant son mot de passe
  - Quand il saisit un mot de passe de moins de 12 caractères (seuil issu des recommandations ANSSI pour mots de passe sans contrainte de complexité)
  - Alors le système rejette la saisie.
  - Mais quand il saisit « monmotdepasselong » (sans chiffres ni caractères spéciaux, 17 caractères)
  - Alors le système accepte la saisie.
- Scénario 2 : Minimisation des données (REQ-105)
  - Étant donné le formulaire de création de compte
  - Alors les seuls champs demandés doivent être : Prénom, Nom, Email, Rôle, Mot de passe (haché en base).

## SPEC-AUTH-03 : Cloisonnement strict des Contributeurs

**Traçabilité :** R-03, REQ-102
**Description :** Un contributeur ne doit jamais avoir accès aux vues ou aux données globales de l'application (cartographie, liste des risques).

**Critères d'acceptation**

- Scénario 1 : Tentative d'accès illicite (REQ-102)
  - Étant donné le contributeur « Thomas » authentifié
  - Quand il tente d'accéder à l'URL des risques ou des actifs (via l'interface ou une requête directe)
  - Alors le système refuse la requête et affiche une page « Accès non autorisé » (sans exposer de données métier).