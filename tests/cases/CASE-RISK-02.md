# CASE-RISK-02 — Majoration RGPD avec basculement de catégorie

**Trace :** SPEC-RISK-03
**Description :** Prouver que le marquage « sensible » a un impact mathématique réel sur le calcul final du risque.

- Cas nominal (Actif sensible) :
  - Entrée : Actif « Fichier licenciés » (Sensible = Vrai). Probabilité saisie = 3, Impact saisi = 2.
  - Calcul attendu : Impact majoré de 2 vers 3 (+1). Criticité = 3 × 3 = 9.
  - Sortie attendue : Score de 9, Catégorie « Majeur ».
- Cas jumeau de contrôle (Actif non sensible) :
  - Entrée : Actif « Menuiserie du local » (Sensible = Faux). Probabilité saisie = 3, Impact saisi = 2.
  - Calcul attendu : Impact non majoré = 2. Criticité = 3 × 2 = 6.
  - Sortie attendue : Score de 6, Catégorie « Majeur ».
  - Vérification : Le risque sur l'actif sensible génère un score supérieur de 3 points.