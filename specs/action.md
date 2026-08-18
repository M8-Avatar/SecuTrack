# Spécifications Fonctionnelles — Domaine ACTION (Tâches et Traçabilité)

**Domaine :** Assignation, Suivi des actions correctives et Historique d'audit
**Exigences couvertes :** REQ-004, REQ-005, REQ-006, REQ-007

## SPEC-ACTION-01 : Création, assignation et gestion

**Traçabilité :** REQ-004, REQ-005
**Description :** L'administrateur crée les actions, et le contributeur peut suivre et modifier uniquement celles qui le concernent.

**Critères d'acceptation**

- Scénario 1 : Création et assignation (REQ-004)
  - Étant donné l'administrateur « Julien » sur la fiche d'un risque
  - Quand il crée une action corrective « Vérifier l'antivirus » et sélectionne le contributeur « Thomas » comme responsable
  - Alors l'action est enregistrée dans le système avec le statut À faire sous la responsabilité exclusive de Thomas.
- Scénario 2 : Liste restreinte du contributeur (REQ-005)
  - Étant donné le contributeur « Thomas » connecté à son espace
  - Quand il consulte sa page d'accueil ou « Mes Actions »
  - Alors il ne voit que les plans d'action dont il est le responsable désigné, sans accès à leur contexte global (risque parent).
- Scénario 3 : Mise à jour du statut par le contributeur (REQ-005)
  - Étant donné une tâche assignée à Thomas (statut : À faire)
  - Quand Thomas passe le statut à Terminé
  - Alors le statut est mis à jour dans le système.

## SPEC-ACTION-02 : Gestion des échéances (Alertes visuelles)

**Traçabilité :** REQ-007
**Description :** Identifier rapidement les actions en retard directement dans l'interface (in-app).

**Critères d'acceptation**

- Scénario 1 : Badge de retard visuel
  - Étant donné un plan d'action dont la « Date limite » est antérieure à la date du jour
  - Et dont le statut n'est pas Terminé
  - Quand la liste des actions est affichée (vue Admin ou vue Contributeur)
  - Alors un badge ou indicateur visuel (ex : « En retard ») est affiché clairement sur la ligne de la tâche concernée.

## SPEC-ACTION-03 : Traçabilité et Historique in-situ

**Traçabilité :** REQ-006
**Description :** Chaque plan d'action intègre son propre journal d'audit chronologique.

**Critères d'acceptation**

- Scénario 1 : Enregistrement d'un événement au niveau de la tâche
  - Étant donné l'action « Changer le mot de passe Wi-Fi »
  - Quand l'utilisateur « Julien » la crée, puis que « Thomas » modifie son statut
  - Alors le panneau de détail de l'action affiche un historique lisible et non modifiable listant :
    - [Date/Heure] Julien Payet a créé l'action et l'a assignée à Thomas.
    - [Date/Heure] Thomas a changé le statut vers « Terminé ».