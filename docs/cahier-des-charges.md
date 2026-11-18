# Cahier des charges — SecuTrack

**Équipe :** Arnaud Bidel  
**Version :** v2.0 — 18 novembre 2026  
**Sources :** compte-rendu-entretien-01.md, compte-rendu-entretien-02.md

> Ce document formalise le problème compris, pas la solution. Aucun nom de technologie, aucun nom de framework, aucune structure de base de données ici.

## 1. Contexte

L'association « Réunion Nautique Jeunesse », présidée par M. Julien Payet, gère des informations sensibles telles que des dossiers d'adhérents mineurs, des données bancaires et des codes d'accès aux locaux. Actuellement, le club ne dispose d'aucune méthode formalisée de sécurité de l'information.

La gestion des risques s'effectue aujourd'hui de manière artisanale, via un fichier tableur partagé entre le président et le trésorier, mis à jour de façon irrégulière. Le président souhaite professionnaliser cette démarche pour anticiper d'éventuels sinistres bloquants et être en mesure de justifier d'une traçabilité rigoureuse en cas de contrôle de la CNIL ou d'interrogation des parents.

## 2. Problème

L'association gère des données critiques sans processus formalisé ni centralisé pour évaluer et traiter ses vulnérabilités numériques. L'usage actuel d'un fichier tableur rend le suivi chronophage, irrégulier et inadapté pour déléguer des tâches de sécurité à certains bénévoles sans exposer l'ensemble des points faibles du club. Le club se trouve donc exposé, tant techniquement (risque de blocage opérationnel) que réglementairement (incapacité à prouver une démarche sérieuse de sécurisation).

## 3. Objectifs

| # | Objectif | Comment on saura que c'est atteint |
|---|---|---|
| 1 | Cartographier le patrimoine informationnel à protéger. | Une liste des actifs et des données est saisie, et le niveau de gravité de chaque élément est évalué. |
| 2 | Faciliter l'identification visuelle des urgences. | Un tableau de bord présente dès l'accueil un indicateur de criticité mettant en évidence les risques prioritaires. |
| 3 | Assurer la résolution et la traçabilité des vulnérabilités. | Les actions correctives sont assignées, leur statut est suivi dans le temps, et un historique permet de prouver « qui a fait quoi ». |

## 4. Parties prenantes

| Partie prenante | Rôle | Ce qu'elle attend | Utilise l'application ? |
|---|---|---|---|
| Julien Payet (Président) | Commanditaire & Administrateur | Un outil simple, une vue globale des urgences, une couverture réglementaire. | oui |
| Le Trésorier | Co-Administrateur | Les mêmes pouvoirs que le président pour assurer la continuité opérationnelle du club. | oui |
| Bénévoles « ciblés » | Contributeurs (exécutants) | Savoir exactement quelles tâches accomplir, sans complexité ni pollution de leur boîte mail personnelle. | oui |
| Bénévoles aux inscriptions | Secrétariat | Ne pas être impactés par l'outil de sécurité. | non |
| Parents & CNIL | Régulateur / Tiers de confiance | La garantie que les données personnelles, notamment celles des mineurs, sont protégées et tracées. | non |

## 5. Personas

**Julien — Le Dirigeant / Administrateur**
- Contexte d'usage : depuis son domicile ou le bureau de l'association, sur un navigateur (PC), de manière périodique.
- Objectif : avoir une vision claire des risques urgents et pouvoir déléguer des tâches concrètes sans perdre le contrôle.
- Ce qui le bloque aujourd'hui : l'aspect brouillon et décentralisé du fichier actuel.

**Thomas — Le Bénévole « bricoleur » / Contributeur**
- Contexte d'usage : au local du club, sur un PC partagé ou sur son smartphone, lors d'actions ponctuelles sur site.
- Objectif : visualiser la tâche précise qui lui est confiée, la marquer comme faite, et passer à autre chose.
- Ce qui le bloque aujourd'hui : le manque de directives centralisées et traçables.

## 6. Périmètre

**Dans le périmètre**
- Cartographie des actifs matériels et des données.
- Évaluation des impacts via un questionnement en langage courant.
- Calcul de la criticité d'un risque.
- Tableau de bord de pilotage.
- Assignation et suivi de plans d'action correctifs.
- Notifications applicatives (sans e-mail).
- Réassignation des actions en cas de départ d'un membre.
- Historique des actions et journal des opérations d'administration.
- Version mobile simplifiée pour la consultation et la mise à jour des actions.
- Impression ou export d'une vue de synthèse (priorité Should).

**Hors périmètre**

| Élément écarté | Motif |
|---|---|
| Rappels automatiques par e-mail | Le client souhaite éviter de polluer les boîtes personnelles des bénévoles (CR-01/Q07, CR-02/Q20). |
| Gestion des alertes RGPD complexes | Une simple case à cocher suffit (CR-01/Q10). |
| Écran d'audit global (recherche avancée) | Un historique simple sous la tâche suffit (CR-01/Q11). |
| Inscription libre des utilisateurs | Le client exige un contrôle total et manuel de la création des accès (CR-01/Q13). |
| Profil « Lecture seule » / Auditeur | Cas d'usage trop rare, dépriorisé pour la V1 (CR-01/Q16). |
| Double authentification | Le client ne la souhaite pas en V1 (CR-02/Q45). |
| Scanners de vulnérabilités, IA d'aide à l'analyse | Hors V1 (CR-02/Q48). |
| Multi-organisation | L'outil est destiné à un seul club (CR-02/Q48). |

## 7. Contraintes

| # | Contrainte | Nature | Source |
|---|---|---|---|
| 1 | Ergonomie lexicale | UX / Accessibilité | CR-01/Q08 |
| 2 | Compartimentation stricte | Sécurité / Métier | CR-01/Q05 |
| 3 | Inscription verrouillée | Sécurité | CR-01/Q13 |
| 4 | Budget maximal de 10 à 15 € par mois, à faire voter par le bureau | Financière | CR-02/Q34 |
| 5 | Hébergement en France ou dans l'Union européenne | Juridique / Souveraineté | CR-02/Q35 |
| 6 | Version mobile simplifiée (consultation et mise à jour des actions) | UX | CR-02/Q38, Q39 |
| 7 | Accessibilité : contraste, information non portée par la couleur seule, agrandissement | Accessibilité | CR-02/Q41 |
| 8 | Sauvegarde quotidienne conservée 30 jours, restauration testée avant mise en service | Exploitation | CR-02/Q52 |
| 9 | Aucun envoi d'e-mails | Produit | CR-01/Q07, CR-02/Q20 |
| 10 | Pas de double authentification en V1 | Produit | CR-02/Q45 |

## 8. Règles métier

| # | Règle | Source |
|---|---|---|
| R-01 | Les administrateurs (Président, Trésorier) sont les seuls habilités à créer des comptes utilisateurs. | CR-01/Q13, Q14 |
| R-02 | Le nombre d'administrateurs disposant d'un accès total est strictement limité à deux personnes. | CR-01/Q14 |
| R-03 | Un contributeur ne peut visualiser que les actions qui lui sont explicitement assignées, et en aucun cas la liste globale des risques. | CR-01/Q05 |
| R-04 | La présence de données personnelles ou sensibles augmente le niveau de criticité du risque associé. | déduit — CR-01/Q10, Q12 |
| R-05 | Une action dont l'échéance est le jour même est considérée comme « à échéance aujourd'hui », et non comme en retard. Elle devient « en retard » à partir du lendemain de la date d'échéance, si elle n'est pas terminée. | CR-02/Q21, Q22 ; « lendemain » déduit |
| R-06 | Lorsqu'un membre quitte le bureau mais reste au club, il perd immédiatement ses droits d'administrateur. Un administrateur décide ensuite, au cas par cas, s'il devient contributeur ou si son compte est désactivé. | CR-02/Q27, Q54 |
| R-07 | Lorsqu'un membre quitte le club, son compte est désactivé. | CR-02/Q30 |
| R-08 | Une action et l'intégralité de son historique sont conservées avec les noms pendant trois ans à compter de la clôture de l'action, puis supprimées définitivement. La clôture recouvre toute issue mettant fin au suivi de l'action ; cette notion est déduite, la liste des statuts relevant des spécifications. Une action encore ouverte conserve son historique jusqu'à sa clôture. Les entrées d'historique non rattachées à une action, notamment les changements de rôle et les créations de compte, sont conservées pendant trois ans à compter de l'événement, puis supprimées. Aucune anonymisation ni archivage n'est prévu. | CR-02/Q28, Q29, Q31, Q32, Q51, Q53 |
| R-09 | Lorsqu'un membre quitte le club alors qu'il a des actions en cours, un administrateur réassigne ces actions. Les actions ne disparaissent pas et l'application conserve la trace de l'ancien responsable. | CR-02/Q30, Q55 |
| R-10 | Un compte désactivé est supprimé lorsqu'aucune action ni entrée d'historique conservée ne le mentionne plus. | CR-02/Q30, Q32 ; déduit |
| R-11 | Un contributeur consulte l'historique des actions qui lui sont actuellement assignées. Les administrateurs consultent l'historique des actions. L'historique ne doit pas ajouter d'information sur le risque associé : ni son intitulé, ni son niveau de criticité. Le contenu libre saisi par un administrateur relève de sa responsabilité. | CR-02/Q33, Q56 |

## 9. Exigences fonctionnelles

> Les exigences de type « Must » sont regroupées par cas d'usage (CU) validés avec le client.

| ID | Exigence | Priorité | Persona | Source |
|---|---|---|---|---|
| **CU 1 — Cartographier le patrimoine** | | | | |
| REQ-001 | L'application doit permettre de créer, modifier et consulter les actifs matériels et les données à protéger, avec évaluation de la gravité via des questions en langage courant. | Must | Julien | CR-01/Q08, Q12 |
| REQ-002 | L'application doit permettre d'identifier les actifs contenant des données personnelles via une case à cocher. | Must | Julien | CR-01/Q10 |
| REQ-003 | L'application doit signaler visuellement les actifs contenant des données personnelles ou sensibles. | Must | Julien | CR-01/Q10, Q12 |
| **CU 2 — Évaluer et prioriser les risques** | | | | |
| REQ-004 | L'application doit permettre de créer un risque lié à un actif, de décrire la menace et d'évaluer les impacts via des questions en langage courant. | Must | Julien | CR-01/Q08, Q12 |
| REQ-005 | L'application doit calculer la criticité d'un risque, en tenant compte de la présence de données personnelles ou sensibles. | Must | Julien | CR-01/Q09, Q10, Q12 ; R-04 |
| REQ-006 | L'application doit afficher sur le tableau de bord d'accueil un indicateur de criticité (feu tricolore) mettant en évidence les risques prioritaires. | Must | Julien | CR-01/Q09, Q12 |
| REQ-007 | L'application doit permettre d'imprimer ou d'exporter une vue de synthèse de la situation pour le bureau ou l'assemblée générale. | Should | Julien | CR-02/Q46 |
| **CU 3 — Piloter les actions** | | | | |
| REQ-008 | L'application doit permettre de créer une action corrective liée à un risque, avec un responsable, une échéance et une description. | Must | Julien | CR-01/Q12 ; CR-02/Q21 |
| REQ-009 | L'application doit permettre au contributeur de consulter uniquement ses actions assignées, de mettre à jour leur statut et d'ajouter un commentaire. | Must | Thomas | CR-01/Q05, Q07 ; CR-02/Q43, Q44 |
| REQ-010 | L'application doit marquer automatiquement comme « en retard » toute action non terminée dont l'échéance est dépassée depuis au moins un jour. Le jour même, l'action est « à échéance aujourd'hui ». | Must | Julien, Thomas | R-05 ; CR-02/Q21, Q22 |
| REQ-011 | L'application doit afficher dès la connexion du contributeur ses échéances à venir (dans les 7 jours), celles du jour et les retards. | Must | Thomas | CR-02/Q21, Q23 |
| REQ-012 | L'application doit afficher sur le tableau de bord administrateur les actions en retard. | Must | Julien | CR-02/Q24 |
| REQ-013 | L'application doit permettre à un administrateur de réassigner une action en cours lorsqu'un membre quitte le club, en conservant la trace de l'ancien responsable. | Must | Julien | R-09 ; CR-02/Q55 |
| **CU 4 — Tracer l'activité** | | | | |
| REQ-014 | L'application doit enregistrer dans le détail de chaque action un historique (qui, quoi, quand), incluant création, assignation, changement de statut, commentaire et réassignation. | Must | Julien | CR-01/Q11 ; CR-02/Q55 |
| REQ-015 | L'application doit permettre au contributeur actuellement assigné de consulter l'historique de ses actions, sans information ajoutée sur le risque associé (ni intitulé, ni niveau de criticité). | Must | Thomas | R-11 ; CR-02/Q56 |
| REQ-016 | L'application doit enregistrer les changements de rôle et les créations de compte dans un journal consultable par les administrateurs. | Must | Julien | CR-02/Q28 |
| REQ-017 | L'application doit conserver les noms dans l'historique pendant trois ans après la clôture d'une action, ou après l'événement pour les entrées hors action, puis supprimer définitivement. | Must | Julien | R-08 ; CR-02/Q29, Q31, Q32, Q51, Q53 |
| **CU 5 — Administrer les accès** | | | | |
| REQ-018 | L'application doit permettre aux administrateurs de créer des comptes utilisateurs. | Must | Julien | R-01 ; CR-01/Q13, Q14 |
| REQ-019 | L'application doit limiter à deux le nombre d'administrateurs simultanés. | Must | Julien | R-02 ; CR-01/Q14 |
| REQ-020 | L'application doit permettre à un administrateur de modifier le rôle d'un membre (administrateur, contributeur, désactivé), avec traçabilité. | Must | Julien | R-06, R-07 ; CR-02/Q27, Q28, Q54 |
| REQ-021 | L'application doit désactiver le compte d'un membre qui quitte le club, puis le supprimer lorsqu'aucune action ni entrée d'historique conservée ne le mentionne plus. | Must | Julien | R-07, R-10 ; CR-02/Q30, Q32 |

## 10. Exigences non fonctionnelles

| ID | Exigence | Comment on la vérifie | Source |
|---|---|---|---|
| REQ-101 | Cloisonnement des données : un contributeur ne doit pas pouvoir accéder à la cartographie globale ni à la liste des risques. | Tentative d'accès direct avec un compte contributeur : refus et message clair. | CR-01/Q05 ; R-03 |
| REQ-102 | Aucune page d'inscription publique ne doit exister ou être accessible. | Absence de lien « S'inscrire » et échec d'accès à une URL d'inscription générique. | CR-01/Q13 |
| REQ-103 | Politique de mots de passe : longueur minimale imposée, sans obligation de caractères spéciaux. | Échec avec mot de passe court ; succès avec mot de passe long alphanumérique. | CR-01/Q13 |
| REQ-104 | Minimisation des données : seuls nom, prénom, adresse e-mail, rôle et date de dernière connexion sont collectés. Pas d'adresse IP, de téléphone ou d'adresse postale. | Vérification du modèle de données et des écrans. | CR-02/Q42 |
| REQ-105 | L'interface doit être utilisable sur smartphone pour la consultation et la mise à jour des actions. | Test sur mobile : consultation des tâches et mise à jour du statut. | CR-02/Q38, Q39 |
| REQ-106 | L'information de criticité ne doit pas reposer uniquement sur la couleur (feu tricolore) ; un contraste suffisant et une alternative visuelle sont requis. | Test de contraste et vérification de la lisibilité sans distinction de couleur. | CR-02/Q41 |
| REQ-107 | L'interface doit rester lisible avec un agrandissement de l'affichage (cas du trésorier). | Test d'agrandissement à 150 % et vérification de la lisibilité. | CR-02/Q41 |
| REQ-108 | L'hébergement doit être situé en France ou dans l'Union européenne. | Vérification de la localisation de l'hébergeur et des données. | CR-02/Q35 |
| REQ-109 | Une sauvegarde quotidienne doit être réalisée et conservée 30 jours, avec une restauration testée avant la mise en service. | Vérification de la planification des sauvegardes et d'un test de restauration documenté. | CR-02/Q52 |
| REQ-110 | Aucun e-mail ne doit être envoyé par l'application. | Vérification de l'absence de service d'envoi d'e-mails et des parcours associés. | CR-01/Q07 ; CR-02/Q20 |
| REQ-111 | L'authentification ne doit pas imposer de second facteur en V1. | Vérification de l'absence de mécanisme de double authentification obligatoire. | CR-02/Q45 |

## 11. Questions restées ouvertes

| # | Question | Posée le | Réponse | Hypothèse retenue en attendant |
|---|---|---|---|---|
| 1 | Comment permettre au nouveau bureau de reprendre la main si les deux administrateurs quittent le club en même temps, sans créer une porte d'accès permanente ? | 18/11/2026 (Q26, Q50) | À étudier | Solution technique à définir dans une spécification ou une décision d'architecture. |
| 2 | Quelle est la durée maximale réellement justifiable pour conserver les noms dans l'historique ? | 18/11/2026 (Q29, Q51) | Trois ans retenus si justifiable, sinon durée maximale justifiable | À documenter dans le cahier des charges ou une décision d'architecture. |
| 3 | Quelle obligation d'accessibilité s'applique à l'association ? | 18/11/2026 (Q40) | À vérifier | Niveau RGAA à déterminer et expliquer à M. Payet. |

## 12. Validation client

| Version | Date | Présentée au client | Retour |
|---|---|---|---|
| v2.0 | 18/11/2026 | à présenter | Relecture en attente par M. Payet. |