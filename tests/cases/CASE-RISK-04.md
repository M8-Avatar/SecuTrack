# CASE-RISK-04 — Dashboard feu tricolore (Ordonnancement)

**Trace :** SPEC-RISK-02
**Description :** S'assurer que les risques les plus critiques « remontent » bien en haut du tableau de bord.

- Prérequis : Trois risques existent en base.
  - Risque A (Score 4 — Acceptable — Vert)
  - Risque B (Score 12 — Critique — Rouge)
  - Risque C (Score 6 — Majeur — Orange)
- Entrée : Chargement du tableau de bord d'accueil.
- Sortie attendue : La liste visuelle des risques présente les éléments dans l'ordre de priorité décroissant : Risque B, puis Risque C, puis Risque A. Le bloc ou la mention « Critique » chapeaute bien le premier résultat.