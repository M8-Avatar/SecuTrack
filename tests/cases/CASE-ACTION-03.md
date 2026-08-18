# CASE-ACTION-03 — Historique in-situ (Immuabilité et Chronologie)

**Trace :** SPEC-ACTION-03
**Description :** Prouver que la traçabilité des actions est fiable, chronologique et infalsifiable depuis l'interface.

- Prérequis : Action créée le `01/10/2026 à 10:00` par Julien, assignée à Thomas. Puis modifiée le `02/10/2026 à 14:30` par Thomas (passage à Terminé).
- Entrée : Ouverture du panneau de détail de l'action concernée.
- Sortie attendue : Le journal d'audit s'affiche, présentant deux entrées distinctes.
  - Les deux entrées apparaissent en ordre chronologique croissant (création en haut, dernier changement en dessous).
  - Aucun bouton ou mécanisme d'édition/suppression n'est présent à côté de ces lignes d'historique (lecture seule absolue).