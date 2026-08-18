# CASE-RISK-01 — Frontières de la matrice de criticité

**Trace :** SPEC-RISK-01
**Description :** Valider le basculement correct entre les trois catégories (Acceptable, Majeur, Critique) aux valeurs frontières. La matrice gère l'ensemble du continuum (1 à 16).

- Scénario 1 : Frontière haute « Acceptable » (Score 4)
  - Entrée : Probabilité = 2, Impact = 2.
  - Calcul attendu : 2 × 2 = 4.
  - Sortie attendue : Catégorie « Acceptable » (Vert).
- Scénario 2 : Frontière basse « Majeur » (Score 6)
  - Note : Le score 5 est inatteignable par le produit de deux entiers de 1 à 4.
  - Entrée : Probabilité = 2, Impact = 3.
  - Calcul attendu : 2 × 3 = 6.
  - Sortie attendue : Catégorie « Majeur » (Orange).
- Scénario 3 : Frontière haute « Majeur » (Score 9)
  - Entrée : Probabilité = 3, Impact = 3.
  - Calcul attendu : 3 × 3 = 9.
  - Sortie attendue : Catégorie « Majeur » (Orange).
- Scénario 4 : Frontière basse « Critique » (Score 12)
  - Note : les scores 10 et 11 sont inatteignables par un produit de deux entiers de 1 à 4 ; la borne « ≥ 10 » couvre néanmoins tout le continuum sans faille.
  - Entrée : Probabilité = 3, Impact = 4.
  - Calcul attendu : 3 × 4 = 12.
  - Sortie attendue : Catégorie « Critique » (Rouge).