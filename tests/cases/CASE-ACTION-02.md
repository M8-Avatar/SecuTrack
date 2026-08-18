# CASE-ACTION-02 — Affichage dynamique du badge de retard

**Trace :** SPEC-ACTION-02
**Description :** Vérifier la logique temporelle des alertes visuelles.

- Entrée : Date du jour système fixée au `15/09/2026`.
  - Tâche A : Échéance au `10/09/2026`, Statut = « À faire ».
  - Tâche B : Échéance au `10/09/2026`, Statut = « Terminé ».
  - Tâche C : Échéance au `20/09/2026`, Statut = « En cours ».
- Sortie attendue :
  - Tâche A : Affiche le badge « En retard » (Rouge).
  - Tâche B : N'affiche pas le badge (clôturée malgré le dépassement).
  - Tâche C : N'affiche pas le badge (délai non expiré).