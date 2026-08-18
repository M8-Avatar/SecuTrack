# Spécifications Fonctionnelles — Domaine ASSET (Cartographie du patrimoine)

**Domaine :** Recensement du matériel, des données et évaluation des impacts
**Exigences couvertes :** REQ-001, REQ-003, REQ-101

## SPEC-ASSET-01 : Saisie et évaluation d'un actif en langage naturel

**Traçabilité :** REQ-001, REQ-101
**Description :** L'utilisateur peut ajouter un bien au patrimoine et évaluer sa criticité via un questionnaire compréhensible par un non-spécialiste.

**Critères d'acceptation**

- Scénario 1 : Création d'un actif matériel et accessibilité sémantique
  - Étant donné l'administrateur connecté sur la page d'ajout d'actif
  - Quand il saisit le nom « Serveur NAS du local »
  - Alors l'interface lui pose des questions formulées en langage métier courant (ex : « Que se passe-t-il si ce matériel est détruit ou volé ? »), en conformité avec l'exigence d'accessibilité REQ-101.
- Scénario 2 : Évaluation d'impact
  - Étant donné les réponses au questionnaire
  - Quand l'administrateur valide la création
  - Alors le système calcule et enregistre un niveau global pour cet actif (sur l'échelle interne de l'application).

## SPEC-ASSET-02 : Signalétique RGPD / Données sensibles

**Traçabilité :** REQ-003
**Description :** Indiquer explicitement si un actif manipule des données à caractère personnel pour se couvrir réglementairement.

**Critères d'acceptation**

- Scénario 1 : Flag lors de la création/modification
  - Étant donné le formulaire de création d'un actif
  - Quand l'utilisateur coche la case « Cet actif contient des données personnelles ou sensibles »
  - Alors l'actif est sauvegardé avec un marqueur fonctionnel indiquant la présence de données sensibles.
- Scénario 2 : Affichage visuel dans la liste
  - Étant donné la liste du patrimoine (vue Administrateur)
  - Quand un actif est marqué comme contenant des données sensibles
  - Alors un badge visuel distinctif est affiché de façon permanente à côté de son nom.