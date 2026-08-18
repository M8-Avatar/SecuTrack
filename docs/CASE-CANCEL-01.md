# CASE-CANCEL-01 — Annulation client à moins de 48 heures

**Spécification :** `SPEC-CANCEL-03`  
**Critère d'acceptation :** `AC-02`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le régime financier applicable lorsqu'un client annule lui-même
sa réservation à moins de 48 heures du départ. Si la règle se casse, le
prestataire peut rembourser une somme trop importante ou retenir une somme qui
ne lui est pas due.

## Cas

```gherkin
Étant donné une réservation confirmée d'un montant total de 260 €
Et une sortie prévue le 18 août 2026 à 09:00
Et une demande d'annulation faite le 17 août 2026 à 09:00
Et que l'annulation est demandée par le client
Et qu'aucune alerte ni annulation du prestataire n'est en cours
Quand le client confirme l'annulation de sa réservation
Alors la réservation passe au statut « annulée »
Et 130 € restent acquis au prestataire
Et 130 € sont remboursés au client
```

## Données

| Élément | Valeur |
|---|---:|
| Montant total payé | 260 € |
| Départ de la sortie | 18 août 2026 à 09:00 |
| Demande d'annulation | 17 août 2026 à 09:00 |
| Délai avant le départ | 24 heures |
| Origine de l'annulation | client |
| Retenue applicable | 50 % |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant retenu | 130 € | 260 € × 50 % |
| Montant remboursé | 130 € | 260 € − 130 € |
| Statut de la réservation | annulée | résultat de la confirmation |

## Ce que ce cas ne vérifie pas

- l'annulation exactement 48 heures avant le départ ;
- l'annulation entre 48 heures et 7 jours avant le départ ;
- l'annulation plus de 7 jours avant le départ ;
- l'annulation décidée par le prestataire ;
- l'annulation causée par la météo, une panne ou un nombre insuffisant de
  participants ;
- l'absence du client au départ ;
- le délai bancaire nécessaire pour recevoir le remboursement.

---

## Test automatisé

**Nom attendu :**
`test_CASE_CANCEL_01_annulation_client_moins_48h_retient_50_pourcent`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test reprend le montant de 260 €.
- [ ] Le test place l'annulation 24 heures avant le départ.
- [ ] Le test distingue une annulation client d'une annulation du prestataire.
- [ ] Le test vérifie une retenue de 130 €.
- [ ] Le test vérifie un remboursement de 130 €.
- [ ] Le test vérifie le passage au statut « annulée ».
- [ ] Le test échoue si la retenue de 50 % est volontairement supprimée du code.
- [ ] Le nom du test contient `CASE_CANCEL_01`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
