# Compte-rendu d'entretien n° 02 — Validation du cahier des charges v1.2

**Projet :** SecuTrack — Outil d'analyse de risques pour petites structures  
**Date :** 18 novembre 2026  
**Lieu / modalité :** Entretien écrit asynchrone  
**Durée :** sans objet  

**Participants :**
- Arnaud Bidel, Concepteur Développeur d'Applications (maîtrise d'œuvre)
- M. Julien Payet, Président de l'association « Réunion Nautique Jeunesse » (maîtrise d'ouvrage — commanditaire fictif)

> Précision méthodologique : le projet étant réalisé en formation, sans commanditaire réel, ce document formalise un entretien de validation avec un profil-type représentatif du public cible (dirigeant associatif sans service SSI dédié). Le rôle du client a été tenu par un assistant IA. La question Q17 a été posée individuellement. Les questions Q18 à Q49 ont ensuite été transmises dans un seul lot écrit. Les questions Q50 à Q53 ont été posées à la suite, afin de lever trois points restés ouverts et de valider la synthèse de l'entretien.

**Q17 — [Arnaud Bidel]** : Après relecture de la version 1.2 du cahier des charges SecuTrack, considérez-vous que les objectifs, le périmètre retenu et les éléments explicitement hors périmètre correspondent bien à votre besoin pour la première version ? Y a-t-il un point que vous souhaitez modifier, ajouter ou retirer avant validation ?  
**[M. Payet]** : Dans l'ensemble, oui, je m'y retrouve. Les trois grands objectifs, c'est bien ce que je vous avais dit : lister ce qu'on a, voir ce qui est grave, suivre qui fait quoi. Et le hors périmètre me va, je ne reviens pas dessus : pas d'e-mails, pas d'usine à gaz RGPD, pas d'inscription libre.  
Par contre, deux choses m'ont fait tiquer à la lecture.  
La première : je vous avais dit que je voulais que les bénévoles voient leurs échéances en se connectant. Je vois bien que les e-mails sont écartés, très bien, mais je n'ai pas retrouvé l'autre moitié. Si Thomas se connecte et que rien ne lui dit qu'il a une tâche en retard, on revient au fichier Excel.  
La seconde, c'est plus une impression. Vous écrivez que Thomas se sert parfois de son téléphone. C'est vrai, et à vrai dire c'est même le cas le plus fréquent : quand il est au local en train de vérifier un PC, il n'a pas d'ordinateur sous la main. Je ne sais pas si c'est prévu ou pas, je ne suis pas technicien, mais il faut que ça marche correctement là-dessus.  
Pour le reste, je valide. Enfin, sous réserve que ces deux points soient réglés.

**Q18 — [Arnaud Bidel]** : Parmi les modules prévus — cartographie des actifs, scénarios de risque, plans d'action, tableau de bord et journal d'activité — lesquels sont absolument indispensables pour que SecuTrack soit utile dès sa première mise en service ?  
**[M. Payet]** : Les trois que je vous avais donnés : lister ce qu'on a, noter les risques, suivre les actions. Le tableau de bord avec le feu tricolore, pour moi il en fait partie, c'est par là que j'entre. Le « journal d'activité », si c'est l'historique sous chaque tâche, oui. Si c'est un écran à part, je n'en ai pas besoin.

**Q19 — [Arnaud Bidel]** : Lorsque la première version sera utilisable, quel résultat concret devrez-vous pouvoir obtenir avec SecuTrack ? Par exemple : identifier les actifs critiques, suivre les actions correctives, visualiser les risques, ou autre chose ?  
**[M. Payet]** : Qu'en ouvrant l'outil, je sache en deux minutes ce qui est urgent et qui doit s'en occuper. Et que le jour où un parent ou la CNIL me pose la question, je puisse montrer ce qu'on a fait, avec les dates.

**Q20 — [Arnaud Bidel]** : Vous avez indiqué que les notifications étaient une priorité. Dans la première version, une notification doit-elle être uniquement visible dans l'application, ou doit-elle également être envoyée par e-mail au contributeur concerné ?  
**[M. Payet]** : Dans l'application seulement. Pas d'e-mail, je n'ai pas changé d'avis.

**Q21 — [Arnaud Bidel]** : À quel moment un contributeur doit-il être averti qu'une action approche de son échéance : plusieurs jours avant, la veille, le jour même, ou selon une règle différente ?  
**[M. Payet]** : Je n'y ai pas réfléchi aussi précisément. Une semaine avant, ça me paraît bien, et qu'on le voie clairement le jour même. Maintenant que vous posez la question : si Thomas ne se connecte pas de la semaine, il ne verra rien. Tant pis, je l'appellerai. Mais moi, je veux le voir de mon côté.

**Q22 — [Arnaud Bidel]** : Lorsque l'échéance d'une action est dépassée, l'application doit-elle automatiquement la marquer comme « en retard », ou cette qualification doit-elle rester manuelle ?  
**[M. Payet]** : Automatiquement. Si je dois le faire à la main, je ne le ferai pas.

**Q23 — [Arnaud Bidel]** : Où un contributeur doit-il pouvoir retrouver ses notifications : sur le tableau de bord, dans une zone dédiée, dans la vue Kanban des actions, ou à plusieurs endroits ?  
**[M. Payet]** : Dès qu'il se connecte, sur sa première page. Il ne doit pas avoir à chercher. « Kanban », je ne sais pas ce que c'est.

**Q24 — [Arnaud Bidel]** : L'auditeur ou le responsable sécurité doit-il également être averti lorsqu'une action est en retard, lorsqu'une action est terminée, ou lorsqu'un risque critique est créé ?  
**[M. Payet]** : On n'a pas d'auditeur ni de responsable sécurité, je vous l'avais dit. Il y a le trésorier et moi. Les retards, oui, on veut les voir sur notre tableau de bord. Une tâche terminée, pas besoin de me prévenir, je le verrai. Les risques critiques, c'est nous qui les saisissons, donc on est au courant.

**Q25 — [Arnaud Bidel]** : Vous avez évoqué une limite de deux administrateurs. Confirmez-vous que SecuTrack doit autoriser au maximum deux comptes administrateurs simultanément ?  
**[M. Payet]** : Oui. Deux, pas plus.

**Q26 — [Arnaud Bidel]** : Que doit-il se passer lorsqu'un administrateur quitte le club, perd son rôle ou n'est plus disponible ? L'administrateur restant doit-il pouvoir nommer un remplaçant, ou une autre règle doit-elle s'appliquer ?  
**[M. Payet]** : Celui qui reste nomme le remplaçant. En général c'est après l'assemblée générale, quand le bureau change. Si les deux partent en même temps… je n'y avais pas pensé. Ça peut arriver si tout le bureau est renouvelé. Dites-moi ce qui est possible.

**Q27 — [Arnaud Bidel]** : Lors du remplacement d'un administrateur, l'ancien administrateur doit-il perdre immédiatement tous ses droits, conserver un accès limité pendant une période, ou être simplement désactivé ?  
**[M. Payet]** : Il perd ses droits tout de suite. Mais on ne supprime rien de ce qu'il a fait.

**Q28 — [Arnaud Bidel]** : Le changement de rôle d'un administrateur doit-il être enregistré dans le journal d'activité, avec l'identité de la personne ayant réalisé l'opération et la date ?  
**[M. Payet]** : Évidemment. C'est le genre de chose qu'on me demandera.

**Q29 — [Arnaud Bidel]** : Quelle durée de conservation souhaitez-vous pour le journal d'activité : six mois, douze mois, vingt-quatre mois, ou une autre durée ?  
**[M. Payet]** : Je ne sais pas ce que dit la loi. De mon côté, au moins la durée d'un mandat du bureau, donc trois ans. Si un nouveau président arrive, il doit pouvoir comprendre ce qui a été fait avant lui. Si la CNIL impose moins, dites-le-moi.

**Q30 — [Arnaud Bidel]** : Lorsqu'un bénévole quitte le club, son compte doit-il être supprimé, désactivé, anonymisé, ou conservé pendant une durée déterminée afin de préserver l'historique des actions réalisées ?  
**[M. Payet]** : Désactivé. Il ne peut plus se connecter, mais son nom reste sur ce qu'il a fait.

**Q31 — [Arnaud Bidel]** : Après le départ d'un bénévole, quelles informations devez-vous pouvoir consulter : son nom, ses actions passées, les risques auxquels il était associé, la date de ses interventions, ou uniquement un identifiant anonymisé ?  
**[M. Payet]** : Son nom, ce qu'il a fait et quand. Un identifiant anonyme ne me sert à rien : « qui devait s'en occuper », c'est une personne.

**Q32 — [Arnaud Bidel]** : À l'expiration de la durée de conservation, les données du journal doivent-elles être supprimées définitivement, anonymisées, ou archivées de manière séparée ?  
**[M. Payet]** : Supprimées. Je ne veux pas gérer des archives.

**Q33 — [Arnaud Bidel]** : Un ancien bénévole doit-il pouvoir consulter son historique après son départ, ou cet historique doit-il rester accessible uniquement aux administrateurs et auditeurs ?  
**[M. Payet]** : Non. Il a quitté le club, il n'a plus accès. Seuls le trésorier et moi voyons ça.

**Q34 — [Arnaud Bidel]** : Quel budget mensuel ou annuel pouvez-vous consacrer à l'hébergement de SecuTrack, en tenant compte de l'hébergement de l'application, des bases de données, des sauvegardes et des éventuels services externes ?  
**[M. Payet]** : On est une association. Dix à quinze euros par mois au grand maximum, et moins ce serait mieux. Il faudra que je le fasse voter au bureau.

**Q35 — [Arnaud Bidel]** : L'application doit-elle être hébergée sur une infrastructure déjà utilisée par le club, chez un hébergeur français ou européen, ou n'y a-t-il aucune contrainte particulière ?  
**[M. Payet]** : On n'a rien à nous. Le site du club est chez un hébergeur, je ne sais même plus lequel. Avec des données qui touchent des mineurs, je préfère que ça reste en France ou en Europe.

**Q36 — [Arnaud Bidel]** : À quelle fréquence les données doivent-elles être sauvegardées, et pendant combien de temps une sauvegarde doit-elle être conservée ?  
**[M. Payet]** : Aucune idée de ce qui se fait. Perdre une journée de saisie, ça va. Perdre un mois, non. Pour la durée de conservation, je vous laisse proposer.

**Q37 — [Arnaud Bidel]** : Certains coûts sont-ils explicitement exclus du budget, par exemple l'envoi d'e-mails transactionnels, un nom de domaine, un certificat SSL ou un service de monitoring ?  
**[M. Payet]** : On a déjà le nom de domaine du club. Je ne veux aucun abonnement en plus. Les e-mails, on n'en envoie pas, donc la question ne se pose pas.

**Q38 — [Arnaud Bidel]** : Thomas utilise un smartphone. Quels parcours doivent impérativement fonctionner sur mobile : consultation du tableau de bord, consultation de ses actions, mise à jour du statut d'une action, consultation des risques, ou autre ?  
**[M. Payet]** : Pour Thomas : voir ses tâches et cocher quand c'est fait. C'est tout. Moi, je travaille sur l'ordinateur.

**Q39 — [Arnaud Bidel]** : L'application doit-elle être pleinement utilisable sur smartphone dès la première version, ou une version mobile simplifiée, limitée à la consultation et à la mise à jour des actions, suffit-elle ?  
**[M. Payet]** : La version simple suffit. Si le reste ne s'affiche pas parfaitement sur téléphone, ce n'est pas grave.

**Q40 — [Arnaud Bidel]** : L'application doit-elle viser une conformité RGAA de niveau AA sur les parcours principaux, ou une conformité complète sur l'ensemble des écrans ?  
**[M. Payet]** : Je ne sais pas ce qu'est le RGAA. S'il y a une obligation, dites-moi laquelle. Ce que je veux, c'est que ce soit lisible et que personne ne soit bloqué.

**Q41 — [Arnaud Bidel]** : Y a-t-il des utilisateurs particuliers à prendre en compte, par exemple des personnes utilisant un lecteur d'écran, une navigation au clavier, un contraste renforcé ou une taille de police agrandie ?  
**[M. Payet]** : Oui, deux choses. Le trésorier a plus de soixante ans et il agrandit tout à l'écran. Et un de nos bénévoles confond le rouge et le vert. Avec mon feu tricolore, je me rends compte que ça risque de poser un problème.

**Q42 — [Arnaud Bidel]** : Quelles données personnelles l'application doit-elle collecter pour chaque utilisateur : nom, prénom, adresse e-mail, rôle, date de dernière connexion, adresse IP, autre information ?  
**[M. Payet]** : Nom, prénom, adresse e-mail pour se connecter. La date de dernière connexion m'intéresse, pour voir si un bénévole n'ouvre jamais l'outil. L'adresse IP, je ne vois pas pourquoi. Le moins possible.

**Q43 — [Arnaud Bidel]** : Un contributeur doit-il pouvoir consulter uniquement les actions qui lui sont assignées, ou également les risques et actifs directement liés à ces actions ?  
**[M. Payet]** : Seulement ses tâches. Mais il doit savoir de quel matériel on parle : « le PC de l'accueil », par exemple. Pas le risque derrière ni le reste.

**Q44 — [Arnaud Bidel]** : Un contributeur peut-il uniquement mettre à jour le statut et ajouter un commentaire à ses actions, ou peut-il également proposer une modification du contenu d'une action ?  
**[M. Payet]** : Cocher, et laisser un mot du genre « fait, mais le disque est presque plein ». Il ne modifie pas la tâche elle-même.

**Q45 — [Arnaud Bidel]** : La double authentification est-elle nécessaire dès la première version, ou peut-elle être prévue comme évolution ultérieure ?  
**[M. Payet]** : Le code par SMS ? Pas pour les bénévoles, ils abandonneraient. Pour le trésorier et moi, peut-être un jour. Pas maintenant.

**Q46 — [Arnaud Bidel]** : Un export CSV ou PDF des risques, des actifs et des actions est-il nécessaire dès la première version ?  
**[M. Payet]** : Pour le bureau ou l'assemblée générale, j'aimerais pouvoir montrer la situation sur papier. Si je peux imprimer l'écran proprement, ça me suffit pour commencer.

**Q47 — [Arnaud Bidel]** : L'historique des évaluations d'un risque doit-il être visible directement dans la liste des risques, ou uniquement dans le détail d'un risque ?  
**[M. Payet]** : Je n'ai rien demandé de tel. Si ça existe, dans le détail, pas dans la liste.

**Q48 — [Arnaud Bidel]** : Parmi les fonctions suivantes, lesquelles sont des évolutions à prévoir après la première version : rapports PDF, intégration de scanners de vulnérabilités, multi-organisation, notifications e-mail, IA d'aide à l'analyse, autre ?  
**[M. Payet]** : Tout ça, c'est pour plus tard, ou jamais. Plusieurs organisations : non, c'est pour notre club. Les scanners et l'IA : non. Un rapport PDF, pourquoi pas un jour. Les e-mails, on en reparlera si les bénévoles ne se connectent pas.

**Q49 — [Arnaud Bidel]** : À l'issue de cet entretien, validez-vous le principe d'une version 2.0 du cahier des charges intégrant les décisions prises aujourd'hui, sous réserve de la relecture finale du document ?  
**[M. Payet]** : Oui, sous réserve de relire le document.

## Confirmations complémentaires

**Q50 — [Arnaud Bidel]** : Si les deux administrateurs quittent le club en même temps, acceptez-vous qu'un compte administrateur de secours, créé lors de l'installation et protégé par un mot de passe remis au président, permette de réattribuer les rôles ? Cette opération serait tracée dans le journal.  
**[M. Payet]** : Ça me gêne. Je vous ai dit deux administrateurs, et là il y en aurait un troisième qui dort dans un tiroir avec tous les pouvoirs. Ce que je veux est simple : que le nouveau bureau ne soit pas bloqué, et que ce ne soit pas une porte ouverte. Comment vous y arrivez, c'est votre métier.

**Q51 — [Arnaud Bidel]** : Acceptez-vous une conservation des journaux pendant 12 mois avec les données personnelles, puis une anonymisation des identifiants pendant 24 mois supplémentaires, afin de conserver une vision sur trois mandats sans conserver inutilement des données personnelles ?  
> [sic : un mandat]  
**[M. Payet]** : Non. Je vous l'ai dit, un historique sans nom ne me sert à rien. Si la loi permet trois ans à condition de le justifier, je prends trois ans avec les noms, puis on supprime tout. Sinon, donnez-moi la durée maximale et on s'y tient. Pas d'entre-deux.

**Q52 — [Arnaud Bidel]** : Acceptez-vous une sauvegarde quotidienne automatique, conservée pendant 30 jours, avec une procédure de restauration testée avant la mise en service ?  
**[M. Payet]** : Une par jour, gardée un mois, avec un essai de restauration avant la mise en service, oui. Tant que ça tient dans le budget. Les noms de logiciels, je ne les connais pas.

**Q53 — [Arnaud Bidel]** : Je résume les trois décisions prises à l'issue de cet entretien :

1. Concernant le cas où les deux administrateurs quittent le club en même temps, vous n'acceptez pas un troisième administrateur permanent. Votre besoin est que le nouveau bureau puisse reprendre la main sans être bloqué, sans que cela crée une porte d'accès permanente. La solution technique sera étudiée et justifiée dans une spécification ou une décision d'architecture.

2. Concernant la conservation de l'historique, vous ne souhaitez pas d'anonymisation ni d'archivage. Vous souhaitez conserver les noms pendant trois ans si cette durée est justifiable, puis supprimer définitivement les données. À défaut, la durée maximale réellement justifiable sera retenue, sans compromis intermédiaire.

3. Concernant les sauvegardes, vous validez une sauvegarde quotidienne, conservée un mois, avec un essai de restauration avant la mise en service, sous réserve que cela reste dans le budget.

Cette synthèse correspond-elle fidèlement à vos décisions ?  
**[M. Payet]** : Oui, c'est bien ça, avec une précision sur le premier point. Je ne ferme pas la porte à toute solution de secours : ce qui me gêne, c'est un compte permanent qui a tous les pouvoirs et qui dort quelque part. Si vous me proposez autre chose qui ne laisse pas d'accès ouvert en temps normal, je vous écoute. Les points deux et trois, je confirme tels quels.

## Synthèse validée en fin d'entretien

À la question Q53, M. Payet confirme que la synthèse correspond fidèlement à ses décisions, avec la précision suivante sur le premier point :

> « Oui, c'est bien ça, avec une précision sur le premier point. Je ne ferme pas la porte à toute solution de secours : ce qui me gêne, c'est un compte permanent qui a tous les pouvoirs et qui dort quelque part. Si vous me proposez autre chose qui ne laisse pas d'accès ouvert en temps normal, je vous écoute. Les points deux et trois, je confirme tels quels. »

Les décisions retenues sont donc les suivantes :

- Concernant le cas où les deux administrateurs quittent le club en même temps, M. Payet n'exclut pas toute solution de secours. Il écarte un compte administrateur permanent disposant de tous les pouvoirs. Le besoin est que le nouveau bureau puisse reprendre la main sans être bloqué, sans laisser d'accès ouvert en temps normal. La solution technique sera étudiée et justifiée dans une spécification ou une décision d'architecture.
- Concernant la conservation de l'historique, M. Payet ne souhaite pas d'anonymisation ni d'archivage. Il souhaite conserver les noms pendant trois ans si cette durée est justifiable, puis supprimer définitivement les données. À défaut, la durée maximale réellement justifiable sera retenue, sans compromis intermédiaire.
- Concernant les sauvegardes, M. Payet valide une sauvegarde quotidienne, conservée un mois, avec un essai de restauration avant la mise en service, sous réserve que cela reste dans le budget.

## Engagements pris

| Engagement | Question associée | Responsable | Action attendue |
|---|---|---|---|
| Indiquer à M. Payet l'obligation d'accessibilité applicable | Q40 | Maîtrise d'œuvre | Vérifier les obligations applicables à l'association et lui expliquer le niveau attendu |
| Indiquer la durée maximale de conservation réellement justifiable | Q29, Q51 | Maîtrise d'œuvre | Vérifier les règles applicables et proposer une durée argumentée |
| Revenir vers M. Payet avec les solutions possibles en cas de départ simultané des deux administrateurs | Q26, Q50 | Maîtrise d'œuvre | Étudier une solution permettant la reprise de contrôle sans compte administrateur permanent supplémentaire |
| Faire voter le budget d'hébergement par le bureau | Q34 | M. Payet | Présenter le budget retenu au bureau avant tout engagement financier |

## Questions ouvertes

| Sujet | Question ouverte | Décision à prendre |
|---|---|---|
| Double départ des administrateurs | Comment permettre au nouveau bureau de reprendre la main si les deux administrateurs actifs quittent le club en même temps, sans créer une porte d'accès permanente ? | À étudier dans une spécification ou une décision d'architecture |
| Durée de conservation | Quelle durée maximale est réellement justifiable pour conserver les noms dans l'historique ? | À justifier dans le cahier des charges ou une décision d'architecture |

## Validation

M. Payet valide le principe de la version 2.0 du cahier des charges, sous réserve de sa relecture finale.

La version 2.0 devra intégrer les décisions prises lors de cet entretien.