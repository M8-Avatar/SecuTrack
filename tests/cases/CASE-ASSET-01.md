# CASE-ASSET-01 — Enregistrement du drapeau de sensibilité

**Trace :** SPEC-ASSET-02
**Description :** S'assurer que le formulaire transmet correctement l'information de sensibilité lors de la création d'un actif.

- Entrée : Formulaire de création rempli avec Nom = « Base de données Cloud », case « Contient des données personnelles ou sensibles » cochée. Validation du formulaire.
- Sortie attendue : La donnée métier enregistrée inclut le marqueur de sensibilité. L'interface de liste affiche immédiatement l'icône ou le badge correspondant à côté du nom de l'actif.