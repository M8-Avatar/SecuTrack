# Cahier des charges — SecuTrack

**Équipe :** Arnaud Bidel
**Version :** v1.2 — 18 août 2026
**Sources :** compte-rendu-entretien-01.md

> Ce document formalise le problème compris, pas la solution. Aucun nom de technologie, aucun nom de framework, aucune structure de base de données ici.

## 1. Contexte

L'association « Réunion Nautique Jeunesse », présidée par M. Julien Payet, gère des informations sensibles telles que des dossiers d'adhérents mineurs, des données bancaires et des codes d'accès aux locaux. Actuellement, le club ne dispose d'aucune méthode formalisée de sécurité de l'information.

La gestion des risques s'effectue aujourd'hui de manière artisanale, via un fichier tableur partagé entre le président et le trésorier, mis à jour de façon irrégulière. Le président souhaite professionnaliser cette démarche pour anticiper d'éventuels sinistres bloquants (comme la paralysie informatique d'un club voisin l'année passée) et être en mesure de justifier d'une traçabilité rigoureuse en cas de contrôle de la CNIL ou d'interrogation des parents.

## 2. Problème

L'association gère des données critiques sans processus formalisé ni centralisé pour évaluer et traiter ses vulnérabilités numériques. L'usage actuel d'un fichier tableur rend le suivi chronophage, irrégulier et totalement inadapté pour déléguer des tâches de sécurité à certains bénévoles sans exposer l'ensemble des points faibles du club. Le club se trouve donc exposé, tant techniquement (risques de blocage opérationnel) que réglementairement (incapacité à prouver une démarche sérieuse de sécurisation).

## 3. Objectifs

| # | Objectif | Comment on saura que c'est atteint |
|---|---|---|
| 1 | Cartographier le patrimoine informationnel à protéger. | Une liste exhaustive du matériel et des données est saisie, et le niveau de gravité de chaque élément est évalué. |
| 2 | Faciliter l'identification visuelle des urgences. | Un tableau de bord présente dès l'accueil un indicateur de criticité (feu tricolore) mettant en évidence les risques prioritaires. |
| 3 | Assurer la résolution et la traçabilité des vulnérabilités. | Les actions correctives sont assignées, leur statut d'avancement est suivi dans le temps, et un historique permet de prouver « qui a fait quoi ». |

## 4. Parties prenantes

| Partie prenante | Rôle | Ce qu'elle attend | Utilise l'application ? |
|---|---|---|---|
| Julien Payet (Président) | Commanditaire & Administrateur | Un outil simple, une vue globale des urgences, une couverture réglementaire. | oui |
| Le Trésorier | Co-Administrateur | Les mêmes pouvoirs que le président pour assurer la continuité opérationnelle du club. | oui |
| Bénévoles « ciblés » | Contributeurs (exécutants) | Savoir exactement quelles tâches accomplir, sans complexité ni pollution de leur boîte mail personnelle. | oui |
| Bénévoles aux inscriptions | Secrétariat | Ne pas être impactés par l'outil de sécurité ; se concentrer sur leur gestion classique des licenciés. | non |
| Parents & CNIL | Régulateur / Tiers de confiance | La garantie que les données personnelles (notamment des mineurs) sont sérieusement protégées et tracées. | non |

## 5. Personas

**Julien — Le Dirigeant / Administrateur**
- Contexte d'usage : Depuis son domicile ou le bureau de l'association, sur un navigateur (PC), de manière périodique (point mensuel ou post-incident).
- Objectif : Avoir une vision claire sur les risques urgents et pouvoir déléguer des tâches concrètes au trésorier ou à des bénévoles sans perdre le contrôle.
- Ce qui le bloque aujourd'hui : L'aspect brouillon et décentralisé du fichier actuel, rendant la délégation périlleuse (risque de fuite d'informations sur les vulnérabilités globales).

**Thomas — Le Bénévole « bricoleur » / Contributeur**
- Contexte d'usage : Au local du club, sur un PC partagé ou sur son smartphone, lors d'actions ponctuelles sur site.
- Objectif : Visualiser la tâche précise qu'on lui a confiée (ex. : vérifier les sauvegardes du poste d'accueil), la marquer comme faite, et passer à autre chose.
- Ce qui le bloque aujourd'hui : Le manque de directives centralisées et traçables ; la sécurité n'étant pas son cœur de métier ni son intérêt principal.

## 6. Périmètre

**Dans le périmètre**
- Cartographie des éléments matériels et des données.
- Évaluation des impacts via un questionnement en langage courant.
- Calcul de la criticité d'un risque.
- Tableau de bord de pilotage.
- Assignation et suivi de plans d'action correctifs.
- Signalétique spécifique pour les données personnelles/sensibles.

**Hors périmètre**

| Élément écarté | Motif |
|---|---|
| Rappels automatiques par e-mail | Le client souhaite éviter de polluer les boîtes personnelles des bénévoles (CR-01/Q07). |
| Gestion des alertes RGPD complexes | Une simple case à cocher suffit ; le client refuse l'usine à gaz réglementaire (CR-01/Q10). |
| Écran d'audit global (recherche avancée) | Un historique simple sous la tâche suffit pour répondre à l'urgence (CR-01/Q11). |
| Inscription libre des utilisateurs | Le client exige un contrôle total et manuel de la création des accès (CR-01/Q13). |
| Profil « Lecture seule » / Auditeur | Cas d'usage trop rare (prestataire annuel), dépriorisé pour la V1 (CR-01/Q16). |

## 7. Contraintes

| # | Contrainte | Nature | Source |
|---|---|---|---|
| 1 | Ergonomie lexicale | UX / Accessibilité | CR-01/Q08 |
| 2 | Compartimentation stricte | Sécurité / Métier | CR-01/Q05 |
| 3 | Inscription verrouillée | Sécurité | CR-01/Q13 |
| 4 | Budget indéterminé | Financière | déduit — budget non communiqué (Q03), hypothèse d'un hébergement à coût maîtrisé à anticiper. |

## 8. Règles métier

| # | Règle | Source |
|---|---|---|
| R-01 | Les administrateurs (Président, Trésorier) sont les seuls habilités à créer des comptes utilisateurs. | CR-01/Q13, Q14 |
| R-02 | Le nombre d'administrateurs disposant d'un accès total est strictement limité à deux personnes. | CR-01/Q14 |
| R-03 | Un contributeur ne peut visualiser que les actions qui lui sont explicitement assignées, et en aucun cas la liste globale des risques. | CR-01/Q05 |
| R-04 | La présence de données personnelles/sensibles doit mécaniquement augmenter le niveau de criticité du risque associé. | déduit — pondération indispensable pour que la « case à cocher » (Q10) ait un réel impact sur le « feu tricolore » (Q12). |

## 9. Exigences fonctionnelles

> Note : Les exigences de type « Must » sont regroupées par Cas d'Usage (CU) validés avec le client (CR-01/Q12).

| ID | Exigence | Priorité | Persona | Source |
|---|---|---|---|---|
| **CU 1 — Cartographier le patrimoine** | | | | |
| REQ-001 | L'application doit permettre d'enregistrer le patrimoine à protéger et d'en évaluer la gravité via des questions en langage courant. | Must | Julien | CR-01/Q08, Q12 |
| **CU 2 — Prioriser visuellement** | | | | |
| REQ-002 | L'application doit calculer la criticité des risques et l'afficher sur un tableau de bord d'accueil type « feu tricolore ». | Must | Julien | CR-01/Q09, Q12 |
| REQ-003 | L'application doit permettre d'identifier explicitement les actifs contenant des données personnelles via une case à cocher. | Must | Julien | CR-01/Q10 |
| **CU 3 — Piloter et tracer** | | | | |
| REQ-004 | L'application doit permettre la création d'actions correctives, leur assignation à un utilisateur et le suivi de leur statut. | Must | Julien | CR-01/Q12 |
| REQ-005 | L'application doit fournir au Contributeur un affichage restreint listant uniquement ses propres tâches assignées, avec possibilité d'en modifier le statut. | Must | Thomas | CR-01/Q05, Q07 |
| REQ-006 | L'application doit afficher un historique textuel des actions (qui, quoi, quand) directement au sein du détail de chaque tâche. | Must | Julien | CR-01/Q11 |
| **Transversal — Confort et évolutions** | | | | |
| REQ-007 | L'application devrait mettre en évidence visuellement (badge, icône) les tâches dont l'échéance est dépassée. | Should | Thomas | CR-01/Q07 |
| REQ-008 | L'application pourrait proposer un rôle « consultation seule » pour d'éventuels prestataires externes. | Could | Julien | CR-01/Q16 |

## 10. Exigences non fonctionnelles

| ID | Exigence | Comment on la vérifie | Source |
|---|---|---|---|
| REQ-101 | Accessibilité métier : l'évaluation des actifs doit utiliser des questions fermées contextualisées au lieu de demander une note sur des critères abstraits. | Présence d'un questionnaire métier lors de la création d'un actif (ex : « Peut-on fonctionner si ce PC est en panne ? ») au lieu de « Note de disponibilité ». | CR-01/Q08 |
| REQ-102 | Cloisonnement des données : un utilisateur « Contributeur » ne doit techniquement pas pouvoir accéder à la cartographie globale des risques. | Tentative d'accès direct (contournement) à la page de liste des risques avec un compte Contributeur : l'application doit refuser l'accès et le signaler clairement. | CR-01/Q05 |
| REQ-103 | Contrôle d'accès : aucune page d'inscription publique ne doit être existante ou accessible. | Test de navigation : absence de lien « S'inscrire » et échec de l'accès à une URL d'inscription générique. | CR-01/Q13 |
| REQ-104 | Politique de mots de passe : l'authentification doit imposer une longueur minimale de caractères sans rendre obligatoire l'utilisation de caractères spéciaux. | Échec systématique de la création de compte avec un mot de passe court ; succès avec un mot de passe long mais uniquement alphanumérique. | CR-01/Q13 |
| REQ-105 | Minimisation (RGPD) : l'application ne doit collecter que les données strictement nécessaires à l'authentification et au suivi. | Le modèle de données utilisateur ne contient aucun champ personnel superflu non lié aux droits (ex : pas de téléphone, d'adresse ou de date de naissance). | déduit — conformité légale de base en lien avec la motivation RGPD (CR-01/Q06). |

## 11. Questions restées ouvertes

| # | Question | Posée le | Réponse | Hypothèse retenue en attendant |
|---|---|---|---|---|
| 1 | Quel est le budget ou l'enveloppe de moyens alloués pour le déploiement et l'hébergement ? | 18/08/2026 (Q03) | En attente | Hébergement sur une architecture conteneurisée à coût minimal (VPS ou hébergement mutualisé standard). |
| 2 | Quelle est la durée de conservation souhaitée pour l'historique des actions et le compte des anciens bénévoles ? | Non posée | En attente | Purge des logs au-delà de 12 mois, désactivation plutôt que suppression des comptes pour préserver l'historique « qui a fait quoi ». |

## 12. Validation client

| Version | Date | Présentée au client | Retour |
|---|---|---|---|
| v1.2 | 18/08/2026 | non | En attente de présentation à M. Payet. |