import { StoryDay, WhatsAppMessage } from './types';

export const SOLARISTECH_STORY_DAYS: StoryDay[] = [
  {
    id: 0,
    title: "Le Calme Avant la Tempête",
    subtitle: "Lundi soir - SolarisTech HQ",
    date: "Lundi, 18:00",
    description: "Awa travaille tard, comme toujours. Elle boucle les déclarations de TVA croisées, nettoie les bases de facturation, et met à jour les clés API du système de prélèvement. Personne ne la regarde. Dans son bureau d'angle, Moussa, le DG, regarde ses tableaux Excel simplifiés et se demande pourquoi il paie une comptable si discrète.",
    quote: "« Pourquoi est-elle toujours aussi silencieuse ? Si elle ne fait pas de bruit, c'est qu'elle ne fait rien d'important. » — Moussa",
    metrics: {
      stability: 100,
      satisfaction: 98,
      chaos: 5,
      pressure: 72
    },
    whatsappPreview: [
      "Awa, merci de me poser le rapport mensuel sur mon bureau avant de partir."
    ]
  },
  {
    id: 1,
    title: "Le Renvoi Arbitraire",
    subtitle: "Mardi matin - La rupture",
    date: "Mardi, 09:30",
    description: "Moussa convoque Awa. En 5 minutes, l'affaire est pliée. 'Nous devons restructurer. Il nous faut des profils plus dynamiques, qui participent aux réunions stratégiques. Vos tâches sont simples, nous allons les répartir sur l'équipe commerciale.' Awa écoute en silence, range ses affaires dans une boîte en carton, et s'en va sans dire un mot.",
    quote: "« Ton silence, Moussa l'a pris pour de la faiblesse. Il pensait que tu étais facilement remplaçable. »",
    metrics: {
      stability: 95,
      satisfaction: 90,
      chaos: 15,
      pressure: 75
    },
    whatsappPreview: [
      "Bonjour Awa, merci de passer à mon bureau pour signer ton reçu de solde de tout compte."
    ]
  },
  {
    id: 2,
    title: "Les Premières Failles",
    subtitle: "Mercredi matin - 24h après",
    date: "Mercredi, 10:00",
    description: "Trois gros clients appellent en colère. Leurs remises exceptionnelles n'apparaissent pas sur la plateforme de paiement. Les dossiers d'intégration originaux sont introuvables. Le directeur commercial cherche dans le cloud : tout est crypté par des identifiants uniques d'archivage qu'Awa gérait manuellement pour éviter les fuites de données.",
    quote: "« Où est le dossier Durand S.A. ? Pourquoi tout est bloqué ? »",
    metrics: {
      stability: 70,
      satisfaction: 55,
      chaos: 45,
      pressure: 110
    },
    whatsappPreview: [
      "Awa, tu as mis où le dossier Durand S.A. ? On ne trouve pas l'original.",
      "Awa ? C'est très urgent, réponds stp."
    ]
  },
  {
    id: 3,
    title: "L'Effondrement du Système",
    subtitle: "Jeudi après-midi - 48h après",
    date: "Jeudi, 15:30",
    description: "Le couperet tombe. La facturation automatisée plante suite au renouvellement mensuel des certificats SSL. Personne ne sait comment relancer le script bash qu'Awa avait écrit elle-même. Les fournisseurs de serveurs cloud reçoivent des alertes de non-paiement et menacent de couper l'infrastructure dans 12 heures. La boîte saigne de partout.",
    quote: "« En 48 heures, l'empire de Moussa tremble sur ses bases. »",
    metrics: {
      stability: 25,
      satisfaction: 20,
      chaos: 90,
      pressure: 165
    },
    whatsappPreview: [
      "La facturation a sauté ! Tu as le mot de passe de l'admin Stripe ?",
      "Awa, les serveurs vont couper ! Réponds, je t'en supplie, c'est grave."
    ]
  },
  {
    id: 4,
    title: "L'Appel Désespéré",
    subtitle: "Vendredi matin - Le retour de bâton",
    date: "Vendredi, 08:30",
    description: "Moussa n'a pas dormi de la nuit. Sa boîte perd 15 000€ par heure de blocage. Il compose le numéro d'Awa à 8h30. Puis à 8h45. Puis à 9h00. Le téléphone sonne. Mais Awa ne décroche pas. Elle savoure son café, loin de la tempête. Moussa lui envoie un SMS désespéré : il lui propose de revenir immédiatement avec un salaire doublé.",
    quote: "« Moussa l'a rappelée le vendredi. Elle n'a pas décroché. »",
    metrics: {
      stability: 5,
      satisfaction: 5,
      chaos: 100,
      pressure: 195
    },
    whatsappPreview: [
      "Awa, je m'excuse pour mardi. C'était une erreur monumentale.",
      "Reviens s'il te plaît. On double ton salaire. Tout de suite."
    ]
  }
];

export const MOCK_WHATSAPP_MESSAGES: WhatsAppMessage[] = [
  {
    id: "w1",
    sender: "moussa",
    text: "Bonjour Awa, merci de déposer le classeur de TVA consolidée sur mon bureau ce soir.",
    time: "Lundi, 15:30",
    dayLabel: "Lundi",
    isRead: true
  },
  {
    id: "w2",
    sender: "awa",
    text: "C'est fait, Monsieur. J'ai aussi renouvelé la passerelle de facturation Stripe pour éviter l'interruption mensuelle de jeudi.",
    time: "Lundi, 16:15",
    dayLabel: "Lundi",
    isRead: true
  },
  {
    id: "w3",
    sender: "moussa",
    text: "Parfait.",
    time: "Lundi, 16:20",
    dayLabel: "Lundi",
    isRead: true
  },
  {
    id: "w4",
    sender: "moussa",
    text: "Awa, passe à mon bureau à 10h s'il te plaît. Nous devons faire un point sur ton poste.",
    time: "Mardi, 08:45",
    dayLabel: "Mardi",
    isRead: true
  },
  {
    id: "w5",
    sender: "moussa",
    text: "Awa, tu as mis où le dossier physique de Durand S.A. ? Mon équipe commerciale en a besoin pour la réunion de 11h. On ne trouve rien sur le réseau commun.",
    time: "Mercredi, 10:15",
    dayLabel: "Mercredi",
    isRead: true
  },
  {
    id: "w6",
    sender: "moussa",
    text: "Awa ? C'est urgent, réponds s'il te plaît, le client s'impatiente.",
    time: "Mercredi, 12:30",
    dayLabel: "Mercredi",
    isRead: true
  },
  {
    id: "w7",
    sender: "moussa",
    text: "Awa, la facturation automatique vient de sauter. Tous nos clients reçoivent des erreurs 502 de paiement. Tu es la seule à avoir l'accès admin principal à Stripe Connect. Envoie-moi le mot de passe s'il te plaît.",
    time: "Jeudi, 09:12",
    dayLabel: "Jeudi",
    isRead: true
  },
  {
    id: "w8",
    sender: "moussa",
    text: "Les fournisseurs d'hébergement menacent de couper nos VM dans 6 heures ! Je t'en supplie Awa, débloque la situation. On est tous perdus ici.",
    time: "Jeudi, 14:40",
    dayLabel: "Jeudi",
    isRead: true
  },
  {
    id: "w9",
    sender: "moussa",
    text: "Awa, je m'excuse platement pour mardi. Ma décision était stupide et irréfléchie. J'ai réalisé que tu gérais absolument tout. S'il te plaît, appelle-moi. On double ton salaire actuel, on t'embauche un assistant pour déléguer. Rappelle-moi.",
    time: "Vendredi, 08:35",
    dayLabel: "Vendredi",
    isRead: true
  },
  {
    id: "w10",
    sender: "moussa",
    text: "S'il te plaît... Réponds juste par oui ou non.",
    time: "Vendredi, 11:20",
    dayLabel: "Vendredi",
    isRead: true
  }
];

export const JOB_PRESETS = [
  {
    title: "Comptable & Admin",
    tasks: "Clés API Stripe, rapprochements bancaires manuels, relance des 40 fournisseurs critiques, mots de passe maîtres des serveurs d'envoi.",
    impact: "La facturation automatique s'arrête, les serveurs d'envois coupent pour factures impayées, les clients clés s'en vont faute de dossiers.",
    bossName: "Moussa",
    companyName: "SolarisTech"
  },
  {
    title: "Administrateur Système (SysAdmin)",
    tasks: "Renouvellement des certificats SSL cachés, scripts cron de sauvegarde de nuit, clés d'accès SSH pour l'équipe technique.",
    impact: "Le site web principal affiche une erreur de sécurité, les développeurs ne peuvent plus déployer de correctifs, et la base de données s'arrête suite à un disque saturé non purgé.",
    bossName: "Alexandre",
    companyName: "CloudPulse"
  },
  {
    title: "Responsable Support Client (Customer Success)",
    tasks: "Gestion des exceptions de facturation, négociation directe avec les 5 clients grincheux qui pèsent 40% du CA, routage des tickets VIP.",
    impact: "Les 5 plus gros clients résilient leur contrat en 48 heures suite à des réponses robotiques du bot automatique, panique générale au service commercial.",
    bossName: "Stéphane",
    companyName: "SaaSify"
  },
  {
    title: "Office Manager",
    tasks: "Gestion des badges d'accès physique, validation des notes de frais, commande des licences logicielles mensuelles, lien avec le syndic de copropriété.",
    impact: "La moitié de l'équipe reste bloquée à la porte de l'immeuble le jeudi matin, Slack se coupe faute de carte bancaire valide enregistrée, et les fournisseurs de repas arrêtent les livraisons.",
    bossName: "Nathalie",
    companyName: "Vortex Agency"
  }
];

export const ANONYMOUS_QUOTES = [
  {
    text: "« Je gère l'entièreté des flux EDI de l'entreprise. Personne ne sait ce que veut dire 'EDI' ici. Si je ne valide pas les rapports avant 17h, aucune livraison ne part le lendemain. Mais en entretien annuel, on me demande pourquoi je ne prends pas assez la parole pendant les brainstormings de créativité. »",
    role: "Administrateur de Flux",
    seniority: "6 ans d'ancienneté"
  },
  {
    text: "« Un jour, j'ai pris une semaine de vacances imprévue pour urgence familiale. J'avais prévenu par mail, mais personne n'a lu. Le jeudi, le DG m'a appelé en pleurant parce que les virements de paie n'étaient pas partis. Ils ont cru à un piratage informatique alors qu'il suffisait de double-cliquer sur le script de virement que j'exécute chaque mois. »",
    role: "Gestionnaire de Paie",
    seniority: "4 ans d'ancienneté"
  },
  {
    text: "« On m'appelle 'la fée' du bureau. Ça a l'air mignon, mais c'est insultant. Ça veut juste dire qu'ils adorent que les problèmes complexes de facturation et de douane disparaissent comme par magie sans qu'ils aient à comprendre comment j'ai négocié pendant des heures avec les douaniers. »",
    role: "Assistante Logistique",
    seniority: "8 ans d'ancienneté"
  },
  {
    text: "« Quand le site est tombé à cause d'une attaque DDoS, j'ai passé la nuit blanche à filtrer les requêtes et restaurer les serveurs. Le lendemain à 9h, mon manager m'a fait une remarque parce que je n'avais pas rempli mon rapport d'activité hebdomadaire sur Jira. J'ai compris ce jour-là que l'essentiel était invisible pour eux. »",
    role: "Ingénieur Système (SRE)",
    seniority: "3 ans d'ancienneté"
  },
  {
    text: "« Je suis celle qui connaît par cœur les humeurs et les exigences des 10 plus gros clients de l'agence. Quand ils s'énervent, les commerciaux m'envoient en première ligne pour calmer le jeu en coulisses. Mais sur l'organigramme, je suis juste 'secrétaire'. »",
    role: "Assistante de Direction",
    seniority: "12 ans d'ancienneté"
  },
  {
    text: "« Mon boss m'a dit que mon poste était 'facilement automatisable par une IA'. Je l'ai pris au mot : j'ai automatisé 90% de mes tâches répétitives via des scripts Python. Je passe mes journées à lire et à surveiller les erreurs de l'API. Je n'ai jamais été aussi serein, et mon boss me félicite pour ma régularité légendaire sans savoir que c'est mon code qui travaille. »",
    role: "Technicien de Saisie de Données",
    seniority: "2 ans d'ancienneté"
  }
];
