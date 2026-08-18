# Spécifications Fonctionnelles — Domaine RISK (Évaluation et Pilotage)

**Domaine :** Calcul des risques et Tableau de bord synthétique
**Exigences couvertes :** REQ-002, R-04

## SPEC-RISK-01 : Matrice d'évaluation nominale (Fondation)

**Traçabilité :** REQ-002
**Description :** Établit la méthode de calcul standard de la criticité d'un risque avant toute majoration, basée sur une matrice classique.

**Critères d'acceptation**

- Scénario 1 : Calcul de base
  - Étant donné un scénario de risque en cours d'évaluation
  - Quand l'administrateur évalue la Probabilité (sur une échelle de 1 à 4) et l'Impact (sur une échelle de 1 à 4)
  - Alors la Criticité nominale est définie comme le produit (Probabilité × Impact), résultant en un score de 1 à 16.
- Scénario 2 : Catégorisation
  - Étant donné un score de criticité calculé
  - Alors le système le classe en trois niveaux sur des intervalles continus : Acceptable (score 1 à 4), Majeur (score 5 à 9), Critique (score 10 à 16).

## SPEC-RISK-02 : Tableau de bord « Feu Tricolore »

**Traçabilité :** REQ-002
**Description :** L'écran d'accueil présente la criticité globale pour alerter l'administrateur sur les urgences.

**Critères d'acceptation**

- Scénario 1 : Affichage des risques prioritaires
  - Étant donné l'administrateur accédant au tableau de bord
  - Quand la page se charge
  - Alors une section visuelle « Feu tricolore » s'affiche (Rouge : Critique, Orange : Majeur, Vert : Acceptable).
  - Et la liste des scénarios de risques classés « Critique » est remontée en priorité absolue sous cet indicateur.

## SPEC-RISK-03 : Pondération de la criticité (Impact RGPD)

**Traçabilité :** R-04
**Description :** La présence de données sensibles sur un actif doit aggraver la note finale de tout risque qui pèse sur lui.

**Critères d'acceptation**

- Scénario 1 : Risque sans données sensibles
  - Étant donné un scénario de risque ciblant un actif non sensible
  - Quand le système calcule la matrice
  - Alors le niveau de criticité reste la valeur nominale définie par SPEC-RISK-01.
- Scénario 2 : Majoration automatique stricte (R-04)
  - Étant donné un scénario de risque ciblant le fichier « Dossiers d'inscription » (marqué avec des données personnelles)
  - Quand le système évalue l'Impact
  - Alors la note de l'axe Impact est automatiquement majorée de +1 point (plafonnée au score maximum de 4), augmentant mécaniquement la criticité finale du risque lors de la multiplication.