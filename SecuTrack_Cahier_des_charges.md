# SecuTrack — Expression de besoins & Cahier des charges

**Projet réalisé dans le cadre de la formation Concepteur Développeur d'Applications (CDA)**
**Candidat :** [Votre nom]
**Contexte de réalisation :** Projet personnel réalisé en dehors du cadre entreprise, pendant la formation

---

## 1. Expression des besoins

### 1.1 Contexte et origine du projet

Les petites structures (PME, associations, collectivités de petite taille) sont de plus en plus concernées par les enjeux de sécurité des systèmes d'information, mais disposent rarement d'un outil dédié pour structurer leur démarche d'analyse de risques. Les méthodes reconnues comme EBIOS Risk Manager (ANSSI) sont souvent perçues comme complexes à mettre en œuvre sans outillage adapté, et les structures se contentent fréquemment de fichiers Excel non centralisés, difficiles à faire vivre dans le temps.

### 1.2 Objectif du projet

Concevoir et développer une application web permettant à une petite structure de :
- Recenser et cartographier son patrimoine informationnel (actifs essentiels et supports)
- Identifier et évaluer des scénarios de risques, inspirés de la méthodologie EBIOS RM
- Suivre la mise en œuvre de plans d'action correctifs jusqu'à leur clôture
- Disposer d'une vision synthétique et actualisée de son niveau d'exposition au risque
- Conserver une traçabilité complète des actions réalisées sur la plateforme

### 1.3 Enjeux

- **Pour l'utilisateur final (RSSI, responsable qualité, dirigeant) :** un outil simple, visuel, accessible, qui structure une démarche normalement complexe
- **Pour le projet CDA :** une application dont le domaine métier justifie naturellement des choix techniques exigeants (traçabilité, sécurité, gestion fine des droits), plutôt que des fonctionnalités ajoutées artificiellement

### 1.4 Limites du système (hors périmètre)

- Pas de génération automatique de rapport d'audit normé (PDF réglementaire)
- Pas d'intégration avec des scanners de vulnérabilités tiers
- Pas de gestion multi-organisation dans une v1 (une seule structure par instance)

---

## 2. Cahier des charges

### 2.1 Acteurs du système

| Rôle | Description | Droits |
|---|---|---|
| **Administrateur** | Gère la structure, les utilisateurs et l'ensemble des données | Accès complet (CRUD sur tout le périmètre) |
| **Auditeur / RSSI** | Pilote les analyses de risques et les plans d'action | Création/modification des actifs, risques, plans d'action ; lecture du journal d'activité |
| **Contributeur** | Responsable de la mise en œuvre d'une ou plusieurs actions correctives | Lecture des actifs/risques liés à ses actions ; mise à jour du statut de ses actions assignées uniquement |

### 2.2 Exigences fonctionnelles

#### Module « Authentification et gestion des utilisateurs »
- Connexion sécurisée (email/mot de passe, hashage, protection brute-force)
- Gestion des rôles et permissions
- Réinitialisation de mot de passe

#### Module « Cartographie des actifs »
- Création/modification/suppression de biens essentiels (données, processus métier)
- Création/modification/suppression de biens supports (serveurs, applications, postes de travail)
- Association bien essentiel ↔ biens supports qui le portent
- Évaluation des critères DICP (Disponibilité, Intégrité, Confidentialité, Preuve) par actif

#### Module « Scénarios de risques »
- Création d'un scénario de risque : source de menace, actif visé, vulnérabilité exploitée
- Évaluation probabilité × impact → calcul automatique du niveau de criticité
- Matrice de risques visuelle (vue synthétique)
- Historique des évaluations d'un même risque dans le temps

#### Module « Plans d'action »
- Création d'une action corrective liée à un ou plusieurs risques
- Attribution d'un responsable (contributeur), d'une échéance, d'un statut (à faire / en cours / en retard / terminé)
- Vue Kanban de suivi des actions
- Notifications d'échéance proche ou dépassée

#### Module « Tableau de bord »
- Indicateurs synthétiques : nombre de risques par niveau de criticité, taux d'avancement des plans d'action, actifs les plus exposés
- Filtres par période, par type d'actif, par statut

#### Module « Journal d'activité (audit log) »
- Traçabilité de toute action réalisée (création, modification, suppression, connexion) : qui, quoi, quand
- Consultation filtrable par utilisateur, par type d'action, par période
- Conservation distincte des autres données métier (volumétrie et structure différentes)

### 2.3 Exigences non fonctionnelles

| Catégorie | Exigence |
|---|---|
| **Sécurité** | Validation systématique des entrées, protection contre XSS/CSRF/injection, chiffrement des mots de passe, gestion fine des permissions par rôle |
| **Accessibilité** | Conformité RGAA / WCAG 2.2 AA sur l'ensemble des interfaces |
| **RGPD** | Mentions légales, minimisation des données collectées, durée de conservation définie pour le journal d'activité |
| **Performance** | Temps de réponse acceptable sous charge simulée (test de charge à définir) |
| **Portabilité** | Application conteneurisée, déployable de façon reproductible (Docker) |
| **Maintenabilité** | Code documenté, respect des règles de nommage, architecture en couches |
| **Bilinguisme** | Interface et documentation technique disponibles/compréhensibles en français et en anglais (niveau B1 CECRL) |

### 2.4 Contraintes techniques

- Backend : NestJS (TypeScript), architecture en couches
- Frontend : Next.js, Tailwind CSS
- ORM : Prisma
- Base de données relationnelle : PostgreSQL (actifs, risques, plans d'action, utilisateurs)
- Base de données NoSQL : MongoDB (journal d'activité)
- Authentification : JWT ou Better Auth
- Conteneurisation : Docker / Docker Compose
- Intégration continue : GitHub Actions (lint, tests, analyse statique Semgrep, build)

### 2.5 Livrables attendus du projet

- Dossier de conception (analyse des besoins, maquettes, MCD/MPD, schéma d'architecture)
- Code source versionné (Git)
- Environnement de développement conteneurisé et documenté
- Plan de tests et rapports d'exécution (unitaires, sécurité, charge)
- Procédure et scripts de déploiement
- Pipeline d'intégration continue fonctionnel
- Dossier de projet et support de présentation (diaporama)

---

## 3. Prochaines étapes

1. Formaliser les besoins utilisateur (use cases / user stories)
2. Réaliser les maquettes des écrans (Figma) et leur enchaînement
3. Modéliser les données (MCD / MPD)
4. Définir l'architecture logicielle détaillée
