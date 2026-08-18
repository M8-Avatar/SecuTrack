# Matrice de contrôle d'accès (RBAC) — SecuTrack

**Sources :** R-01, R-02, R-03, REQ-102, REQ-103, SPEC-AUTH-01/03, SPEC-ACTION-01
**Rôles V1 :** Administrateur, Contributeur (le rôle « consultation seule » est hors V1 — CR-01/Q16)

## Convention

- ✓ = autorisé
- ✗ = interdit (le serveur refuse et ne transmet aucune donnée — REQ-102)
- △ = autorisé, mais restreint à ses propres données

## Matrice

| Ressource / Action | Administrateur | Contributeur | Règle / Spec |
|---|---|---|---|
| Se connecter | ✓ | ✓ | SPEC-AUTH-01 |
| Créer / désactiver un compte | ✓ | ✗ | R-01, R-02 |
| Cartographier un actif (créer, modifier) | ✓ | ✗ | REQ-102, R-03 |
| Marquer un actif sensible (RGPD) | ✓ | ✗ | REQ-003 |
| Consulter la liste globale des actifs | ✓ | ✗ | REQ-102, R-03 |
| Évaluer un risque (probabilité × impact) | ✓ | ✗ | REQ-002 |
| Consulter la liste globale des risques | ✓ | ✗ | REQ-102, R-03 |
| Consulter le tableau de bord (feu tricolore) | ✓ | ✗ | SPEC-RISK-02, R-03 |
| Créer et assigner une action corrective | ✓ | ✗ | SPEC-ACTION-01 |
| Consulter TOUTES les actions | ✓ | ✗ | R-03 |
| Consulter SES actions assignées | ✓ | △ | REQ-005, SPEC-ACTION-01 |
| Mettre à jour le statut d'une action | ✓ | △ | REQ-005 |
| Consulter l'historique d'une action | ✓ | ✗ | REQ-006, R-03 |

## Règles transversales

- **Limite de 2 administrateurs** (R-02) : la création d'un 3ᵉ administrateur est refusée par une validation métier (SPEC-AUTH-01, CASE-AUTH-03).
- **Pas d'inscription libre** (R-01, REQ-103) : aucune route publique d'inscription ; les comptes sont créés uniquement par un administrateur.
- **Étanchéité serveur** (REQ-102) : pour le Contributeur, chaque requête de données force le filtre `assigneeId = session.userId`. La restriction n'est jamais assurée uniquement côté client (voir architecture.md §3).
- **Consultation de l'historique réservée à l'administrateur** (REQ-006, R-03) : le besoin de traçabilité « qui devait s'en occuper » a été exprimé par le président dans une logique de supervision (CR-01/Q11). Le contributeur, dont le besoin se limite à voir et cocher ses tâches (CR-01/Q05), n'y a pas accès en V1.
- **Traçabilité** : toute action de création/modification génère une entrée d'historique attribuée à son auteur (SPEC-ACTION-03).