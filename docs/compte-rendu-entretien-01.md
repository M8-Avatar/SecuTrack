# Compte-rendu d'entretien n° 01 — Cadrage initial du besoin

**Projet :** SecuTrack — Outil d'analyse de risques pour petites structures
**Date :** [à compléter]
**Lieu / modalité :** Entretien à distance (visioconférence)
**Durée :** 45 minutes

**Participants :**
- [Votre nom], Concepteur Développeur d'Applications (maîtrise d'œuvre)
- M. Julien Payet, Président de l'association « Réunion Nautique Jeunesse » (maîtrise d'ouvrage — commanditaire fictif)

> Précision méthodologique : le projet étant réalisé en formation, sans commanditaire réel, le candidat formalise ici un entretien de cadrage avec un profil-type représentatif du public cible (dirigeant associatif sans service SSI dédié), afin de structurer une démarche de recueil de besoin conforme à la compétence « Analyser les besoins et maquetter une application ».

---

## 1. Contexte de l'entretien

L'association gère des données sensibles (fichiers licenciés mineurs, données bancaires des adhérents, accès aux locaux du club nautique) mais ne dispose d'aucune démarche formalisée de gestion des risques numériques. Le président a suivi une sensibilisation ANSSI et souhaite structurer une première démarche, sans recruter de RSSI dédié.

## 2. Points abordés

- État des lieux du patrimoine informationnel de l'association (postes de travail, logiciel de gestion des licenciés, site web, stockage cloud des documents administratifs)
- Pratiques actuelles de suivi des risques (fichier Excel partagé, mis à jour de façon irrégulière)
- Attentes vis-à-vis d'un outil dédié
- Contraintes de moyens (pas de budget dédié à un outil du marché, pas de compétence technique en interne au-delà du président et d'un trésorier)

## 3. Besoins exprimés par le commanditaire

- Pouvoir lister simplement « ce qu'on a à protéger » (données, matériel, applications) sans vocabulaire trop technique
- Visualiser rapidement les risques les plus critiques, sans avoir à interpréter une méthode complexe
- Suivre les actions correctives décidées (qui fait quoi, pour quand) et être relancé en cas de retard
- Garder une trace de ce qui a été fait, en cas de contrôle ou de nouvel incident
- Pouvoir déléguer le suivi de certaines actions à un bénévole ou au trésorier, sans lui donner accès à l'ensemble des données

## 4. Contraintes évoquées

- Outil utilisable par une personne non spécialiste de la sécurité informatique
- Hébergement à coût maîtrisé (pas de budget pour une solution SaaS payante à l'échelle)
- Accès depuis un simple navigateur, y compris depuis un poste partagé au club
- Conformité RGPD dans la mesure où des données de mineurs sont concernées

## 5. Décisions / points validés

- Le périmètre de la v1 se limite à une seule structure (pas de gestion multi-organisation)
- La méthode d'évaluation des risques s'appuiera sur les principes d'EBIOS Risk Manager (ANSSI), simplifiés dans l'interface
- Trois profils d'accès suffisent à couvrir les usages exprimés : administrateur, auditeur/RSSI, contributeur
- Un tableau de bord synthétique est prioritaire par rapport à des rapports détaillés exportables

## 6. Questions en suspens

- Faut-il prévoir une notification par email en plus des alertes dans l'application ? *(à trancher lors des spécifications fonctionnelles)*
- Le journal d'activité doit-il être consultable par tous les profils ou réservé à l'administrateur/auditeur ? *(à trancher lors des spécifications fonctionnelles)*

## 7. Prochaines étapes

1. Consolidation du cahier des charges (`docs/cle-cahier-des-charges.md`) à partir des besoins recueillis ci-dessus
2. Rédaction des spécifications fonctionnelles (`docs/cle-specification.md`) : formalisation des besoins en use cases / user stories
3. Formalisation des points en suspens lors d'un second point de cadrage si nécessaire
