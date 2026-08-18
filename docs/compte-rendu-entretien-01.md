# Compte-rendu d'entretien n° 01 — Cadrage initial du besoin

**Projet :** SecuTrack — Outil d'analyse de risques pour petites structures
**Date :** 18 août 2026
**Lieu / modalité :** Entretien à distance (visioconférence)
**Durée :** 45 minutes

**Participants :**
- Arnaud Bidel, Concepteur Développeur d'Applications (maîtrise d'œuvre)
- M. Julien Payet, Président de l'association « Réunion Nautique Jeunesse » (maîtrise d'ouvrage — commanditaire fictif)

> Précision méthodologique : le projet étant réalisé en formation, sans commanditaire réel, ce document formalise un entretien de cadrage avec un profil-type représentatif du public cible (dirigeant associatif sans service SSI dédié), afin de structurer une démarche de recueil de besoins.

**Q01 — [Arnaud Bidel]** : Qu'est-ce qui vous amène aujourd'hui à vouloir mettre en place un outil de gestion des risques pour votre association ?
**[M. Payet]** : On gère pas mal de choses sensibles au club : les dossiers de nos licenciés qui sont souvent mineurs, des données bancaires, les accès aux locaux... J'ai récemment suivi une sensibilisation de l'ANSSI et je me suis rendu compte qu'on n'avait aucune démarche formelle. Je veux anticiper et structurer tout ça.

**Q02 — [Arnaud Bidel]** : De quoi est composé concrètement le patrimoine informatique que vous souhaitez protéger ?
**[M. Payet]** : On a des postes de travail au club, notre logiciel de gestion des adhérents, un site web vitrine, et on utilise un stockage cloud pour la paperasse administrative.

**Q03 — [Arnaud Bidel]** : Avez-vous défini un budget ou des moyens alloués pour la sécurisation de ces éléments ?
**[M. Payet]** : [Sans réponse précise à ce stade, à recreuser]

**Q04 — [Arnaud Bidel]** : Comment suivez-vous vos risques et vos actions correctives à l'heure actuelle, sans outil dédié ?
**[M. Payet]** : C'est très artisanal. On a juste un fichier Excel partagé avec le trésorier. On le met à jour de façon très irrégulière, ce n'est vraiment pas pratique pour faire vivre la démarche dans le temps.

**Q05 — [Arnaud Bidel]** : Justement, les bénévoles qui gèrent les inscriptions — qu'est-ce qu'ils auraient besoin de faire concrètement dans l'outil ? Et à l'inverse, qu'est-ce qu'ils ne devraient surtout pas pouvoir voir ou modifier ?
**[M. Payet]** : Honnêtement, dans un outil comme ça, je ne les vois pas faire grand-chose. Eux, leur truc c'est le tableur des licenciés, pas la sécurité. Mais il y en a un ou deux à qui je confierais bien le suivi de certaines actions — genre "vérifier que les sauvegardes du PC du club sont bien faites", ou "changer le mot de passe wifi du local". Ce qu'ils devraient pouvoir faire : voir les actions qu'on leur a confiées, et cocher quand c'est fait. Ce qu'ils ne devraient surtout pas voir : tout le reste. La liste complète des risques, les points faibles, c'est sensible. S'ils ne peuvent rien supprimer ni modifier à part leurs propres tâches, c'est parfait. Le trésorier et moi, on garde la main sur le reste.

**Q06 — [Arnaud Bidel]** : Si dans six mois vous deviez dire "cet outil m'a vraiment servi à quelque chose", ce serait dans quelle situation précise ?
**[M. Payet]** : Le jour où il y a un pépin. L'an dernier un club voisin s'est fait bloquer son site web juste avant la période d'inscription, la catastrophe. Si ça m'arrive, je veux pouvoir me dire "OK, on avait identifié ce risque, voilà ce qu'on avait prévu, voilà qui devait s'en occuper" — au lieu de découvrir le problème en panique. Et puis, si un jour la CNIL ou un parent me pose des questions sur les données des mineurs, je veux pouvoir montrer qu'on a pris le sujet au sérieux, avec des traces, pas juste un fichier Excel bricolé.

**Q07 — [Arnaud Bidel]** : Concernant les tâches déléguées aux bénévoles, comment souhaitez-vous qu'ils soient prévenus des échéances ?
**[M. Payet]** : Des notifications directement dans l'outil, c'est la priorité. Ils se connectent et ils voient ce qu'ils ont à faire. Envoyer des e-mails automatiques, ça risque juste de polluer leurs boîtes perso, on peut s'en passer pour le moment.

**Q08 — [Arnaud Bidel]** : Pour évaluer la sécurité de vos données, l'outil doit-il utiliser le jargon classique (Disponibilité, Intégrité, Confidentialité) ou préférez-vous des questions en langage naturel ?
**[M. Payet]** : Il faut absolument masquer le jargon. Je préfère un questionnaire en langage naturel qui nous pose des questions de bon sens pour nous aider à évaluer, du genre : "Que se passe-t-il si ce fichier est publié sur internet ?" ou "Peut-on fonctionner si ce PC est en panne ?".

**Q09 — [Arnaud Bidel]** : Quand vous vous connectez à SecuTrack pour faire le point, quelle est la première information que vous voulez voir ?
**[M. Payet]** : Un tableau de bord avec un système de "feu tricolore". Je veux voir immédiatement, dès l'écran d'accueil, si la situation est sous contrôle ou s'il y a des points noirs critiques dont on doit s'occuper en urgence.

**Q10 — [Arnaud Bidel]** : Sur le volet RGPD et les données des mineurs, attendez-vous que l'outil gère des alertes de conformité poussées, ou une simple signalétique suffit-elle ?
**[M. Payet]** : Restons sur la sécurité pure sans déborder sur une usine à gaz RGPD. Une simple case à cocher pour indiquer qu'un élément "contient des données personnelles/sensibles" suffira très bien pour attirer notre attention sur ces fichiers-là.

**Q11 — [Arnaud Bidel]** : Pour la traçabilité lors d'un incident, avez-vous besoin d'un écran d'audit complet de toutes les actions, ou un simple historique sous chaque tâche suffit-il ?
**[M. Payet]** : Un simple historique visible directement sous le plan d'action suffit. Savoir que telle action a été cochée ou mise en retard par telle personne à telle date, c'est tout ce dont on a besoin dans l'urgence pour voir "qui devait s'en occuper".

**Q12 — [Arnaud Bidel]** : Si on se projette sur la toute première version de l'outil (V1), quelles sont les 3 actions incontournables qu'il doit parfaitement faire ?
**[M. Payet]** :
Un. Pouvoir lister ce qu'on a à protéger et dire, pour chaque chose, à quel point c'est grave si ça tourne mal, avec des questions de bon sens.
Deux. Pouvoir noter les risques et voir lesquels sont les plus graves, c'est le fameux feu tricolore.
Trois. Pouvoir créer des actions pour corriger les risques et suivre si elles avancent — les assigner, voir ce qui est fait.
Si l'outil fait bien ça, je signe. Le reste, c'est du confort.

**Q13 — [Arnaud Bidel]** : Un dernier point pratique : qui va créer les comptes des utilisateurs et doit-on être strict sur les mots de passe ?
**[M. Payet]** : C'est moi ou le trésorier qui créons les comptes à la main. Pas d'inscription libre, je veux un contrôle total. Pour les mots de passe, soyez raisonnablement stricts : un minimum de longueur pour bloquer les "1234", mais sans exiger trois caractères spéciaux et une majuscule qui feront que tout le monde notera son code sur un post-it.

**Q14 — [Arnaud Bidel]** : M. Payet, vous mentionnez souvent que le trésorier et vous-même "gardez la main" sur l'application. Concrètement, est-ce que cela signifie qu'il aura exactement le même niveau de pouvoir que vous — comme créer d'autres utilisateurs ou supprimer des données sensibles — ou souhaitez-vous rester le seul administrateur à bord pour ces actions critiques ?
**[M. Payet]** : Non, je ne veux pas être le seul, ce serait ingérable — si je suis en déplacement ou malade, il faut que le club puisse continuer à tourner. Le trésorier, je lui fais totalement confiance, ça fait dix ans qu'on travaille ensemble. Donc lui, il doit pouvoir faire exactement la même chose que moi : créer des comptes, tout voir, tout modifier, supprimer si besoin. On est deux capitaines à bord, à égalité. Par contre, je ne veux que nous deux à ce niveau-là. Pas trois, pas quatre administrateurs. Deux personnes de confiance qui ont tout pouvoir, c'est le maximum.

**Q15 — [Arnaud Bidel]** : Pour être tout à fait clair sur la distribution des accès : les bénévoles à qui vous allez confier des tâches dans l'outil, sont-ils les mêmes qui gèrent les inscriptions des licenciés, ou s'agit-il de profils différents ?
**[M. Payet]** : Ce sont des profils différents. La plupart des bénévoles qui gèrent les inscriptions — ceux qui saisissent les licenciés dans le tableur — n'auront jamais de compte sur SecuTrack. Ça ne les concerne pas. Les personnes à qui je confierai des tâches dans l'outil, c'est un petit groupe à part : deux ou trois bénévoles un peu plus impliqués, plutôt "monsieur bricolage/informatique" du club, à qui je demande déjà de s'occuper du matériel. Ce sont eux qui auront un compte "limité". Gérer les inscriptions et avoir un compte SecuTrack, ce sont deux choses complètement séparées.

**Q16 — [Arnaud Bidel]** : Si je résume, notre modèle s'articule autour de votre profil (avec un contrôle total), celui du trésorier, et de quelques contributeurs avec une vue strictement limitée à leurs propres tâches. Pensez-vous qu'il existera un quatrième cas de figure, par exemple un membre du bureau ou un auditeur qui aurait besoin de tout consulter sans rien modifier ?
**[M. Payet]** : Sur le moment, je ne vois pas qui ça serait. Au club, on n'a pas de commissaire aux comptes ni personne comme ça. Il y a peut-être un cas : parfois on fait appel à un prestataire informatique extérieur pour un coup de main ponctuel. Lui, ça m'arrangerait qu'il puisse regarder notre situation pour nous conseiller, sans pouvoir rien casser. Mais c'est rare, une ou deux fois par an. Donc si ça complique la V1, laissez tomber, on se débrouillera en lui prêtant mon accès le temps d'une réunion. Ce n'est pas une priorité.