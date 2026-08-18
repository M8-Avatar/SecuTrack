# CASE-RISK-03 — Plafond de la majoration RGPD (Effet de butée)

**Trace :** SPEC-RISK-03
**Description :** Vérifier que la majoration ne permet pas de dépasser la valeur d'impact maximale (4).

- Entrée : Actif « Données bancaires » (Sensible = Vrai). Probabilité saisie = 4, Impact saisi = 4.
- Calcul attendu : Tentative de majoration de l'impact (4 + 1 = 5), mais application stricte du plafond à 4. Criticité = 4 × 4 = 16.
- Sortie attendue : Score plafonné à 16, Catégorie « Critique » (et non un crash ou un score impossible de 20).