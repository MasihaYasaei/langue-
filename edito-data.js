// Parcours original inspiré des thèmes et objectifs linguistiques d'Édito A2.
// Les définitions, exemples et exercices ci-dessous ont été rédigés pour Mémora.
export const EDITO_UNITS = [
  {
    id: "unit-1",
    number: 1,
    title: "Nouvelles vies",
    theme: "Parcours, projets et loisirs",
    color: "#7162f4",
    objectives: ["Parler de son parcours", "Exprimer une intention", "Proposer ou refuser une sortie"],
    vocabulary: [
      word("u1-v1", "un parcours", "L'ensemble des étapes importantes d'une vie ou d'une carrière.", "Son parcours professionnel est très varié."),
      word("u1-v2", "une formation", "Un apprentissage organisé pour acquérir des connaissances ou un métier.", "Elle suit une formation en informatique."),
      word("u1-v3", "postuler", "Envoyer sa candidature pour obtenir un emploi ou une place.", "Il va postuler dans une entreprise française."),
      word("u1-v4", "réussir", "Obtenir le résultat souhaité après un effort.", "Tu peux réussir si tu travailles régulièrement."),
      word("u1-v5", "une sortie", "Une activité faite hors de chez soi, souvent avec d'autres personnes.", "Nous organisons une sortie au musée."),
      word("u1-v6", "une randonnée", "Une longue promenade à pied dans la nature.", "Ils font une randonnée en montagne."),
      word("u1-v7", "avoir l'intention de", "Avoir le projet ou la volonté de faire quelque chose.", "J'ai l'intention d'étudier en France."),
      word("u1-v8", "être disponible", "Avoir du temps libre pour une activité ou une rencontre.", "Je suis disponible samedi après-midi.")
    ],
    grammar: [
      grammar("u1-g1", "Le passé composé", "On utilise avoir ou être au présent suivi du participe passé pour raconter une action terminée.", "Elle a commencé une nouvelle formation.", "Choisis la phrase correcte.", ["Hier, je commence un cours.", "Hier, j'ai commencé un cours.", "Hier, je vais commencer un cours."], 1, "« Hier » présente une action terminée : on emploie le passé composé."),
      grammar("u1-g2", "La phrase négative", "Ne… jamais, ne… plus, ne… rien et ne… personne entourent le verbe conjugué.", "Je ne travaille plus dans cette entreprise.", "Complète : Elle ___ voit ___ dans la salle.", ["ne / personne", "n' / personne", "ne / rien"], 1, "Devant une voyelle, « ne » devient « n' » : elle ne voit personne."),
      grammar("u1-g3", "Depuis, pendant, il y a", "Depuis indique une durée qui continue, pendant une durée terminée et il y a un moment passé.", "J'apprends le français depuis deux ans.", "Complète : Il habite ici ___ trois mois.", ["pendant", "depuis", "il y a"], 1, "L'action continue aujourd'hui, donc on utilise « depuis ».")
    ]
  },
  {
    id: "unit-2", number: 2, title: "Je me souviens", theme: "Souvenirs, sensations et paysages", color: "#4f93e8",
    objectives: ["Raconter un souvenir", "Exprimer ce qu'on aime", "Décrire un paysage"],
    vocabulary: [
      word("u2-v1", "se souvenir", "Garder ou retrouver une personne, une chose ou un événement dans sa mémoire.", "Je me souviens de mes premières vacances."),
      word("u2-v2", "un paysage", "Une partie de la nature ou d'un lieu que l'on peut observer.", "Le paysage était magnifique au coucher du soleil."),
      word("u2-v3", "un orage", "Un phénomène avec de fortes pluies, du tonnerre et des éclairs.", "Un orage a éclaté pendant la nuit."),
      word("u2-v4", "une saveur", "La sensation produite par un aliment dans la bouche.", "Cette saveur me rappelle mon enfance."),
      word("u2-v5", "inoubliable", "Que l'on ne peut pas oublier parce que c'était très marquant.", "Nous avons passé une journée inoubliable."),
      word("u2-v6", "ensoleillé", "Où le soleil brille beaucoup.", "Le sud bénéficie d'un climat ensoleillé."),
      word("u2-v7", "avoir un bon souvenir de", "Garder une impression positive d'un événement passé.", "J'ai un bon souvenir de cette ville."),
      word("u2-v8", "la campagne", "L'espace situé loin des grandes villes, avec des champs et des villages.", "Mes grands-parents vivent à la campagne.")
    ],
    grammar: [
      grammar("u2-g1", "Les pronoms y et en", "Y remplace souvent un lieu introduit par à; en remplace un complément introduit par de ou une quantité.", "Tu vas à Lyon ? Oui, j'y vais.", "Réponds : Tu reviens de la plage ? Oui, j'___ reviens.", ["y", "en", "le"], 1, "« De la plage » est remplacé par le pronom « en »."),
      grammar("u2-g2", "La place de l'adjectif", "La plupart des adjectifs se placent après le nom; certains adjectifs courts et fréquents se placent avant.", "C'est un beau souvenir et une histoire intéressante.", "Choisis l'ordre naturel.", ["une intéressante histoire", "une histoire intéressante", "intéressante une histoire"], 1, "L'adjectif « intéressant » se place normalement après le nom.")
    ]
  },
  {
    id: "unit-3", number: 3, title: "Comme à la maison", theme: "Logement, mobilier et quartier", color: "#35ae98",
    objectives: ["Chercher un logement", "Décrire son cadre de vie", "Exprimer sa déception"],
    vocabulary: [
      word("u3-v1", "un loyer", "La somme payée chaque mois pour habiter dans un logement.", "Le loyer comprend l'eau et le chauffage."),
      word("u3-v2", "un colocataire", "Une personne avec qui l'on partage un logement.", "Mon colocataire prépare souvent le dîner."),
      word("u3-v3", "meublé", "Équipé des meubles nécessaires pour y vivre.", "Elle cherche un studio meublé."),
      word("u3-v4", "lumineux", "Qui reçoit beaucoup de lumière.", "Le salon est grand et lumineux."),
      word("u3-v5", "un quartier", "Une partie d'une ville avec ses rues et ses habitants.", "Ce quartier est calme et bien desservi."),
      word("u3-v6", "un équipement", "Un objet ou un ensemble d'objets utiles dans un lieu.", "La cuisine possède tous les équipements nécessaires."),
      word("u3-v7", "un étage", "Un niveau d'un immeuble situé au-dessus du rez-de-chaussée.", "Ils habitent au cinquième étage."),
      word("u3-v8", "déménager", "Quitter un logement pour aller vivre dans un autre.", "Nous allons déménager le mois prochain.")
    ],
    grammar: [
      grammar("u3-g1", "Les pronoms relatifs", "Qui remplace le sujet, que remplace le complément direct et où indique un lieu ou un moment.", "C'est l'appartement que nous avons visité.", "Complète : Voici le quartier ___ j'habite.", ["qui", "que", "où"], 2, "Le pronom « où » remplace un complément de lieu."),
      grammar("u3-g2", "La comparaison", "On compare avec plus… que, moins… que et aussi… que. Pour les noms, on utilise plus de ou moins de.", "Ce studio est moins cher que l'autre.", "Complète : Cette pièce est ___ lumineuse que le salon.", ["aussi", "autant de", "plus de"], 0, "Devant un adjectif, on utilise « aussi… que » pour l'égalité."),
      grammar("u3-g3", "La condition", "Le conditionnel permet d'exprimer un souhait, une demande polie ou une situation imaginaire.", "Je voudrais visiter l'appartement.", "Quelle phrase est la plus polie ?", ["Je veux le dossier.", "Je voudrais le dossier.", "J'ai le dossier."], 1, "Le conditionnel « je voudrais » adoucit la demande.")
    ]
  },
  {
    id: "unit-4", number: 4, title: "Tous pareils, tous différents", theme: "Apparence, caractère et personnalité", color: "#f09a5c",
    objectives: ["Décrire une personne", "Faire un compliment", "Parler des qualités et des défauts"],
    vocabulary: [
      word("u4-v1", "généreux", "Qui aime donner, partager ou aider les autres.", "Mon ami est très généreux avec son temps."),
      word("u4-v2", "têtu", "Qui change difficilement d'avis, même face à de bons arguments.", "Il est parfois têtu, mais il écoute les autres."),
      word("u4-v3", "rigoureux", "Qui travaille avec précision, méthode et sérieux.", "Cette étudiante est organisée et rigoureuse."),
      word("u4-v4", "souple", "Qui s'adapte facilement ou dont le corps bouge avec facilité.", "Elle reste souple face aux changements."),
      word("u4-v5", "ressembler à", "Avoir une apparence ou des caractéristiques proches de quelqu'un.", "Tu ressembles beaucoup à ton père."),
      word("u4-v6", "un défaut", "Un aspect négatif du caractère ou d'une chose.", "L'impatience est son principal défaut."),
      word("u4-v7", "une qualité", "Un trait positif d'une personne ou d'une chose.", "La patience est une qualité utile."),
      word("u4-v8", "élégant", "Qui a une apparence soignée et harmonieuse.", "Il porte une veste simple et élégante.")
    ],
    grammar: [
      grammar("u4-g1", "Les adjectifs indéfinis", "Chaque est toujours singulier; tout s'accorde avec le nom : tout, toute, tous, toutes.", "Chaque personne a toutes ses qualités.", "Complète : ___ les participants sont prêts.", ["Tout", "Tous", "Chaque"], 1, "Devant un nom masculin pluriel, on emploie « tous »."),
      grammar("u4-g2", "Les pronoms possessifs", "Le mien, la tienne, les nôtres… remplacent un nom et indiquent le propriétaire.", "Mon avis est différent du tien.", "Complète : C'est ma veste; cette veste est ___.", ["la mienne", "la tienne", "le mien"], 0, "Le pronom s'accorde avec « veste », féminin singulier : « la mienne »."),
      grammar("u4-g3", "L'accord des adjectifs", "L'adjectif s'accorde en genre et en nombre avec le nom qu'il décrit.", "Ce sont des personnes sérieuses et motivées.", "Complète : Elles sont très ___.", ["généreux", "généreuse", "généreuses"], 2, "Le sujet est féminin pluriel : « généreuses ». ")
    ]
  },
  {
    id: "unit-5", number: 5, title: "En route vers le futur !", theme: "Innovations et technologies", color: "#5d78e8",
    objectives: ["Imaginer l'avenir", "Décrire l'utilité d'un objet", "Exprimer un espoir"],
    vocabulary: [
      word("u5-v1", "une innovation", "Une idée ou une invention nouvelle qui améliore une pratique.", "Cette innovation facilite les déplacements."),
      word("u5-v2", "un appareil", "Un objet technique conçu pour réaliser une fonction.", "Cet appareil mesure la qualité de l'air."),
      word("u5-v3", "fonctionner", "Marcher correctement et produire le résultat attendu.", "Cette application fonctionne sans connexion."),
      word("u5-v4", "télécharger", "Transférer un fichier d'Internet vers un appareil.", "Tu peux télécharger le document gratuitement."),
      word("u5-v5", "pratique", "Facile ou utile dans la vie quotidienne.", "Cette montre est petite et très pratique."),
      word("u5-v6", "inventer", "Créer quelque chose qui n'existait pas auparavant.", "Des chercheurs ont inventé un nouveau matériau."),
      word("u5-v7", "un progrès", "Une amélioration ou une évolution positive.", "La médecine a fait de grands progrès."),
      word("u5-v8", "un espoir", "Le sentiment qu'un événement souhaité peut arriver.", "Cette découverte donne un nouvel espoir.")
    ],
    grammar: [
      grammar("u5-g1", "Le futur simple", "On ajoute généralement ai, as, a, ons, ez, ont à l'infinitif. Certains verbes ont un radical irrégulier.", "Demain, nous utiliserons moins de papier.", "Complète : Dans dix ans, on ___ autrement.", ["voyagera", "voyageait", "a voyagé"], 0, "Une projection dans l'avenir demande le futur simple : « voyagera »."),
      grammar("u5-g2", "La condition avec si", "Après si, on met le présent; la conséquence peut être au présent, au futur ou à l'impératif.", "Si la technologie progresse, nous gagnerons du temps.", "Complète : Si tu installes l'application, tu ___ le service.", ["découvriras", "découvrirais", "découvres hier"], 0, "Si + présent peut être suivi du futur simple."),
      grammar("u5-g3", "Le pronom on", "On peut signifier une personne inconnue, les gens en général ou nous dans un registre courant.", "En France, on utilise souvent le paiement sans contact.", "Dans « On va au cinéma ? », on signifie…", ["quelqu'un", "nous", "personne"], 1, "Dans cette proposition, « on » remplace « nous »." )
    ]
  },
  {
    id: "unit-6", number: 6, title: "En cuisine", theme: "Aliments, recettes et restaurant", color: "#e58b55",
    objectives: ["Donner des instructions", "Mettre en garde", "Communiquer au restaurant"],
    vocabulary: [
      word("u6-v1", "un ingrédient", "Un aliment qui entre dans la préparation d'un plat.", "Il manque un ingrédient dans cette recette."),
      word("u6-v2", "éplucher", "Retirer la peau d'un fruit ou d'un légume.", "Commence par éplucher les pommes de terre."),
      word("u6-v3", "mélanger", "Réunir plusieurs éléments pour former un ensemble.", "Mélange les œufs avec la farine."),
      word("u6-v4", "la cuisson", "La manière ou la durée pendant laquelle un aliment cuit.", "La cuisson du poisson est parfaite."),
      word("u6-v5", "épicé", "Qui contient des épices donnant un goût fort.", "Ce plat est parfumé mais peu épicé."),
      word("u6-v6", "une addition", "Le document indiquant le prix à payer au restaurant.", "Pourrions-nous avoir l'addition, s'il vous plaît ?"),
      word("u6-v7", "un serveur", "Une personne qui prend les commandes et apporte les plats.", "Le serveur nous conseille le plat du jour."),
      word("u6-v8", "réserver", "Garder une place ou un service pour une date précise.", "J'ai réservé une table pour quatre personnes.")
    ],
    grammar: [
      grammar("u6-g1", "Le pronom en", "En remplace un nom introduit par de ou une quantité; la quantité reste dans la phrase.", "Vous voulez du pain ? Oui, j'en veux un peu.", "Réponds : Tu achètes trois tomates ? Oui, j'___ achète trois.", ["y", "en", "les"], 1, "La quantité reste et le nom est remplacé par « en »."),
      grammar("u6-g2", "Obligation et interdiction", "Il faut et devoir expriment l'obligation; il ne faut pas et ne pas devoir expriment l'interdiction.", "Il faut laver les légumes avant de les couper.", "Quelle phrase exprime une interdiction ?", ["Il faut goûter.", "Vous pouvez goûter.", "Il ne faut pas toucher."], 2, "« Il ne faut pas » présente une action interdite."),
      grammar("u6-g3", "La restriction ne… que", "Ne… que signifie seulement. Ce n'est pas une négation complète.", "Ce restaurant ne sert que des produits locaux.", "« Je ne bois que de l'eau » signifie…", ["Je ne bois pas d'eau.", "Je bois seulement de l'eau.", "Je bois beaucoup d'eau."], 1, "La structure « ne… que » exprime une restriction." )
    ]
  },
  {
    id: "unit-7", number: 7, title: "À votre santé !", theme: "Corps, santé et soins", color: "#34ad9a",
    objectives: ["Décrire un problème de santé", "Demander un conseil", "Exprimer son point de vue"],
    vocabulary: [
      word("u7-v1", "une douleur", "Une sensation physique désagréable dans une partie du corps.", "La douleur a diminué après le repos."),
      word("u7-v2", "une ordonnance", "Un document écrit par un médecin pour prescrire un traitement.", "Le pharmacien demande l'ordonnance."),
      word("u7-v3", "tousser", "Faire sortir brusquement de l'air de la gorge ou des poumons.", "Il tousse depuis deux jours."),
      word("u7-v4", "se soigner", "Faire ce qui est nécessaire pour retrouver une bonne santé.", "Elle se soigne et se repose à la maison."),
      word("u7-v5", "une urgence", "Une situation qui demande une intervention immédiate.", "En cas d'urgence, appelez les secours."),
      word("u7-v6", "le sommeil", "L'état naturel de repos pendant lequel on dort.", "Un bon sommeil améliore la concentration."),
      word("u7-v7", "respirer", "Faire entrer et sortir de l'air par le nez ou la bouche.", "Respire lentement pour te détendre."),
      word("u7-v8", "guérir", "Retrouver la santé après une maladie ou une blessure.", "Il faut du temps pour guérir complètement.")
    ],
    grammar: [
      grammar("u7-g1", "Les pronoms COD et COI", "Le, la, les remplacent un complément direct; lui et leur remplacent un complément introduit par à.", "Le médecin lui donne un conseil.", "Remplace : Je téléphone à mes parents.", ["Je les téléphone.", "Je leur téléphone.", "Je lui téléphone."], 1, "« À mes parents » est un COI pluriel : « leur »."),
      grammar("u7-g2", "Le superlatif", "Le plus, la plus, les plus ou le moins placent une personne ou une chose au niveau extrême d'une qualité.", "Le sommeil est le meilleur remède dans ce cas.", "Complète : C'est l'exercice ___ difficile.", ["plus", "le plus", "aussi"], 1, "Le superlatif exige l'article défini : « le plus difficile »."),
      grammar("u7-g3", "Les pronoms interrogatifs", "Qui, que, quoi, lequel et leurs formes servent à demander une information précise.", "Lequel de ces médicaments prenez-vous ?", "Complète : ___ de ces solutions préfères-tu ?", ["Lequel", "Qui", "Quoi"], 0, "On choisit dans un ensemble déjà présenté avec « lequel »." )
    ]
  },
  {
    id: "unit-8", number: 8, title: "Dans les médias", theme: "Information, presse et réseaux", color: "#755fc8",
    objectives: ["S'informer", "Exprimer son intérêt", "Faire une critique"],
    vocabulary: [
      word("u8-v1", "un reportage", "Un contenu journalistique qui présente des faits observés sur le terrain.", "J'ai regardé un reportage sur la biodiversité."),
      word("u8-v2", "une rubrique", "Une partie régulière d'un journal ou d'une émission consacrée à un sujet.", "Elle lit toujours la rubrique culturelle."),
      word("u8-v3", "l'actualité", "L'ensemble des événements récents dans le monde.", "Je suis l'actualité une fois par jour."),
      word("u8-v4", "un journaliste", "Une personne qui recherche, vérifie et présente des informations.", "Le journaliste interroge plusieurs spécialistes."),
      word("u8-v5", "un podcast", "Une émission audio disponible à la demande sur Internet.", "Ce podcast explique la science simplement."),
      word("u8-v6", "un réseau social", "Un service en ligne permettant de publier et d'échanger des contenus.", "Cette information circule sur un réseau social."),
      word("u8-v7", "fiable", "Auquel on peut faire confiance parce qu'il est sérieux et vérifié.", "Il faut vérifier si la source est fiable."),
      word("u8-v8", "une critique", "Un avis argumenté, positif ou négatif, sur une œuvre ou un contenu.", "Elle écrit une critique claire du documentaire.")
    ],
    grammar: [
      grammar("u8-g1", "La cause et la conséquence", "Parce que, car et grâce à expriment la cause; donc, alors et c'est pourquoi expriment la conséquence.", "La source est fiable, donc je partage l'article.", "Complète : Je vérifie l'information ___ elle semble étrange.", ["donc", "parce qu'", "c'est pourquoi"], 1, "La deuxième partie explique la cause : « parce qu'elle… »."),
      grammar("u8-g2", "Le subjonctif", "Après il faut que, il est nécessaire que ou je ne pense pas que, on emploie souvent le subjonctif.", "Il faut que les journalistes vérifient leurs sources.", "Complète : Il faut que tu ___ cet article.", ["lis", "lises", "liras"], 1, "Après « il faut que », le verbe est au subjonctif : « lises »."),
      grammar("u8-g3", "La place des pronoms", "Les pronoms compléments se placent avant le verbe : me/te/se/nous/vous, puis le/la/les, puis lui/leur, puis y, puis en.", "Je le lui explique demain.", "Remplace : Je montre la vidéo à Paul.", ["Je lui la montre.", "Je la lui montre.", "Je montre-la lui."], 1, "Le pronom COD « la » précède le COI « lui »." )
    ]
  },
  {
    id: "unit-9", number: 9, title: "Consommer responsable", theme: "Achats, réparation et réemploi", color: "#55a66d",
    objectives: ["Exprimer un désir", "Donner un conseil", "Demander ou proposer un service"],
    vocabulary: [
      word("u9-v1", "d'occasion", "Déjà utilisé par une autre personne avant d'être vendu ou donné.", "J'ai acheté ce vélo d'occasion."),
      word("u9-v2", "réparer", "Remettre en bon état un objet qui ne fonctionne plus.", "Nous allons réparer cette lampe."),
      word("u9-v3", "emprunter", "Prendre temporairement quelque chose avec l'intention de le rendre.", "Puis-je emprunter ton outil ?"),
      word("u9-v4", "un troc", "Un échange de biens ou de services sans utiliser d'argent.", "Le quartier organise un troc de vêtements."),
      word("u9-v5", "un déchet", "Une matière ou un objet dont on ne veut plus et que l'on jette.", "Nous réduisons nos déchets à la maison."),
      word("u9-v6", "recycler", "Transformer un déchet pour fabriquer un nouveau produit.", "Le verre peut être recyclé plusieurs fois."),
      word("u9-v7", "une matière", "La substance utilisée pour fabriquer un objet.", "Cette matière est solide et naturelle."),
      word("u9-v8", "un outil", "Un objet utilisé pour réaliser un travail manuel.", "Il me faut un outil pour ouvrir le boîtier.")
    ],
    grammar: [
      grammar("u9-g1", "Le conditionnel présent", "Le conditionnel utilise le radical du futur et les terminaisons de l'imparfait. Il exprime un souhait ou une demande polie.", "Pourriez-vous m'aider à réparer cet objet ?", "Complète : Je ___ acheter moins de produits neufs.", ["voudrais", "voudrai", "voulais hier"], 0, "Le conditionnel « voudrais » exprime ici un souhait."),
      grammar("u9-g2", "Le gérondif", "En + participe présent indique deux actions simultanées, une manière ou une condition.", "On économise de l'argent en réparant ses objets.", "Complète : Elle apprend ___ les tutoriels.", ["en regardant", "regardant", "a regardé"], 0, "Le gérondif se forme avec « en » + participe présent."),
      grammar("u9-g3", "Donner un conseil", "On peut utiliser tu devrais, vous pourriez, il vaut mieux ou l'impératif.", "Tu devrais comparer les prix avant d'acheter.", "Quelle phrase donne un conseil ?", ["Tu dois absolument acheter.", "Tu devrais attendre les promotions.", "Tu as attendu."], 1, "« Tu devrais » présente un conseil, pas une obligation forte." )
    ]
  },
  {
    id: "unit-10", number: 10, title: "Envies d'ailleurs ?", theme: "Voyages et tourisme", color: "#3e9db8",
    objectives: ["Demander des renseignements", "Raconter une visite", "Exprimer son agacement"],
    vocabulary: [
      word("u10-v1", "un séjour", "Une période passée dans un lieu différent de son domicile.", "Notre séjour à Montréal a duré dix jours."),
      word("u10-v2", "un hébergement", "Un lieu où l'on peut dormir pendant un voyage.", "L'hébergement se trouve près de la gare."),
      word("u10-v3", "une escale", "Un arrêt intermédiaire pendant un trajet, souvent en avion.", "Notre vol fait une escale à Lisbonne."),
      word("u10-v4", "un guide", "Une personne ou un document qui aide à découvrir un lieu.", "Le guide nous présente le vieux quartier."),
      word("u10-v5", "un monument", "Une construction importante par son histoire ou son architecture.", "Ce monument date du dix-neuvième siècle."),
      word("u10-v6", "un billet", "Un document qui permet de voyager ou d'entrer dans un lieu.", "J'ai réservé mon billet de train en ligne."),
      word("u10-v7", "se renseigner", "Chercher des informations précises avant d'agir.", "Nous nous renseignons sur les horaires."),
      word("u10-v8", "agacé", "Légèrement énervé par une situation répétée ou désagréable.", "Le voyageur est agacé par le retard.")
    ],
    grammar: [
      grammar("u10-g1", "Passé composé ou imparfait", "Le passé composé raconte les actions principales; l'imparfait décrit le décor, une habitude ou une action en cours.", "Il pleuvait quand nous sommes arrivés.", "Complète : La ville ___ calme quand nous ___ la visite.", ["était / avons commencé", "a été / commencions", "sera / commencerons"], 0, "L'imparfait décrit la ville; le passé composé indique l'action qui commence."),
      grammar("u10-g2", "L'accord du participe passé", "Avec être, le participe s'accorde avec le sujet. Avec avoir, il s'accorde avec le COD seulement si celui-ci est placé avant.", "Elles sont arrivées tôt.", "Complète : Marie est ___ à huit heures.", ["arrivé", "arrivée", "arrivées"], 1, "Avec être, le participe s'accorde avec le sujet féminin singulier."),
      grammar("u10-g3", "Les pronoms démonstratifs", "Celui, celle, ceux et celles remplacent un nom déjà mentionné. On les complète souvent par de ou qui/que.", "Je préfère cet hôtel à celui du centre.", "Complète : Ces visites sont plus longues que ___ d'hier.", ["celui", "celle", "celles"], 2, "« Visites » est féminin pluriel : « celles »." )
    ]
  },
  {
    id: "unit-11", number: 11, title: "De jolis parcours", theme: "Études et monde du travail", color: "#8261d8",
    objectives: ["Parler de ses études", "Écrire un message formel", "Présenter un projet professionnel"],
    vocabulary: [
      word("u11-v1", "une candidature", "Une demande officielle pour obtenir un emploi, une formation ou une place.", "Elle envoie sa candidature aujourd'hui."),
      word("u11-v2", "un entretien", "Une rencontre organisée pour discuter d'un emploi ou d'une situation.", "Il prépare son entretien d'embauche."),
      word("u11-v3", "une compétence", "Une capacité acquise grâce à l'expérience ou à l'apprentissage.", "La communication est une compétence essentielle."),
      word("u11-v4", "un diplôme", "Un document officiel qui confirme la réussite d'une formation.", "Ce diplôme est reconnu en Europe."),
      word("u11-v5", "un secteur", "Un domaine d'activité économique ou professionnelle.", "Elle travaille dans le secteur culturel."),
      word("u11-v6", "un collègue", "Une personne qui travaille dans la même organisation.", "Mes collègues m'aident sur ce projet."),
      word("u11-v7", "une reconversion", "Un changement important de métier ou de domaine professionnel.", "Après dix ans, il commence une reconversion."),
      word("u11-v8", "une expérience", "Une activité vécue qui permet d'apprendre ou de développer une capacité.", "Cette expérience a enrichi son CV.")
    ],
    grammar: [
      grammar("u11-g1", "Le discours rapporté au présent", "On rapporte les paroles avec que, si ou un mot interrogatif; les pronoms changent selon la situation.", "Elle dit qu'elle cherche un emploi.", "Transforme : Il dit : « Je suis disponible. »", ["Il dit qu'il est disponible.", "Il dit si je suis disponible.", "Il dit être disponible hier."], 0, "Une déclaration est introduite par « que » et le pronom change."),
      grammar("u11-g2", "Le pronom y avec penser", "Y peut remplacer à + une chose après des verbes comme penser, réfléchir ou participer.", "Mon projet professionnel ? J'y pense souvent.", "Réponds : Tu réfléchis à ta candidature ? Oui, j'___ réfléchis.", ["en", "y", "la"], 1, "« À ma candidature » est remplacé par « y »."),
      grammar("u11-g3", "Le message formel", "On utilise une formule d'appel, des phrases polies et une formule finale adaptée.", "Je vous remercie par avance de votre réponse.", "Quelle formule convient à un courriel formel ?", ["Salut, réponds-moi vite !", "Je vous prie d'agréer mes salutations.", "À plus !"], 1, "Cette formule respecte le registre formel." )
    ]
  },
  {
    id: "unit-12", number: 12, title: "Soif de nature", theme: "Environnement et animaux", color: "#4b9b70",
    objectives: ["Exprimer une inquiétude", "Protester", "Proposer une action pour la nature"],
    vocabulary: [
      word("u12-v1", "la pollution", "La dégradation de l'environnement par des substances ou des activités nuisibles.", "La pollution de l'air diminue dans cette ville."),
      word("u12-v2", "une espèce", "Un groupe d'êtres vivants qui partagent les mêmes caractéristiques.", "Cette espèce d'oiseau est protégée."),
      word("u12-v3", "une forêt", "Un vaste espace couvert principalement d'arbres.", "La forêt abrite de nombreux animaux."),
      word("u12-v4", "protéger", "Mettre à l'abri d'un danger ou d'une dégradation.", "Nous devons protéger les espaces naturels."),
      word("u12-v5", "la biodiversité", "La variété des espèces vivantes dans un milieu.", "La biodiversité est essentielle à l'équilibre naturel."),
      word("u12-v6", "un refuge", "Un lieu où des personnes ou des animaux peuvent être protégés.", "Ce refuge accueille des animaux blessés."),
      word("u12-v7", "durable", "Qui peut continuer longtemps en limitant les effets négatifs sur l'environnement.", "Ils choisissent un mode de transport durable."),
      word("u12-v8", "protester", "Exprimer publiquement son désaccord ou son opposition.", "Les habitants protestent contre le projet." )
    ],
    grammar: [
      grammar("u12-g1", "L'expression du but", "Pour, afin de et dans le but de sont suivis de l'infinitif; pour que et afin que sont suivis du subjonctif.", "Nous agissons pour protéger la biodiversité.", "Complète : Ils créent un refuge pour que les animaux ___ en sécurité.", ["sont", "soient", "seront"], 1, "Après « pour que », on emploie le subjonctif : « soient »."),
      grammar("u12-g2", "La forme passive", "Le complément de la phrase active devient sujet; on utilise être au temps voulu + participe passé.", "Cette forêt est protégée par la loi.", "Mets au passif : Les habitants nettoient la rivière.", ["La rivière nettoie les habitants.", "La rivière est nettoyée par les habitants.", "Les habitants sont nettoyés."], 1, "Le COD « la rivière » devient sujet et le participe s'accorde."),
      grammar("u12-g3", "La négation et les pronoms", "À l'infinitif, les deux éléments négatifs se placent généralement avant le verbe : ne pas, ne plus, ne jamais.", "Nous agissons pour ne pas détruire cet habitat.", "Complète : Il change ses habitudes pour ___ polluer.", ["ne pas", "pas ne", "ne pollue pas"], 0, "Devant un infinitif, on place « ne pas » ensemble." )
    ]
  }
];

function word(id, term, definition, example) {
  return { id, term, definition, translation: definition, example };
}

function grammar(id, title, rule, example, prompt, options, answer, explanation) {
  return { id, title, rule, example, quiz: { prompt, options, answer, explanation } };
}

export function getDailyLesson(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86400000);
  const unit = EDITO_UNITS[day % EDITO_UNITS.length];
  const vocabulary = unit.vocabulary[day % unit.vocabulary.length];
  const grammarPoint = unit.grammar[day % unit.grammar.length];
  return { unit, vocabulary, grammarPoint };
}
