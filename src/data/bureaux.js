// src/data/bureaux.js
export const bureaux = [
  {
    slug: 'tombouctou',
    ville: "Bureau de Tombouctou (siège de l'AMSS)",
    adresse: "Tombouctou/Quartier Hamabangou, Porte : 915, Route de Kabara en face de la BIM sa, BP : 152,",
    telephones: ["+223 21 92 10 48", "+223 76 04 21 32", "+223 66 71 38 12"],
    emails: ["mossainalbaraka@yahoo.fr", "mossa@ong-amss.org"],
    type: "Siège principal",
    responsable: "Moussa Inalbaraka Cissé",
    zones: ["Tombouctou","Diré","Goundam","Niafunké","Foum Elba","Gourma-Rharous"],
    partnersCarto: [
      "Fondation Stromme","UNHCR","CORDAID (Organisation Inter - Eglises de Coopération Pays-Bas)",
      "Welt Hunger Hilfe","Plan International Mali","UNICEF","PPLM","ECHO","USAID","AECID","OXFAM",
      "PNUD","BIT (Bureau International du Travail)","UNESCO","FAO","OCHA","IRC","CARE International",
      "AAH","CRS","DRC","Médecins du Monde","Action contre la Faim","Save the Children","NRC","GIZ","CIDA","Coopération Suisse"
    ],
    coordsQuery: "Tombouctou Mali"
  },

  {
    slug: 'bamako',
    ville: "Bamako",
    // ✅ nouvelle adresse physique (affichée sur la page Contact)
    adresse: "Rue 737, Porte 419, Banankabougou, Bamako",
    // ✅ on conserve la BP si besoin ailleurs
    adressePostale: "BP 153 Bamako",
    telephones: ["+223 76 02 32 25", "+223 66 02 32 25", "+223 20 20 27 28"],
    emails: [
      "elmehdi.agwakina@ong-amss.org","elmehdw@yahoo.fr","ong.amss@yahoo.com","amss@ong-amss.org"
    ],
    type: "Bureau de coordination",
    responsable: "Dr Elmehdi Ag Wakina — Directeur des Programmes",
    distinctions: "Officier de l'Ordre National du Mali ; Président de la Plateforme des ONG Nationales actives dans l'Humanitaire",
    siteWeb: "https://www.ong-amss.org",
    zones: ["Coordination nationale"],
    partnersCarto: [],
    // ✅ Plus Code pour la carte
    coordsQuery: "H3V4+FX Bamako"
  },

  {
    slug: 'gao',
    ville: "Base d'AMSS Gao",
    adresse: "Gao , Château seteur II",
    telephones: ["+223 76 94 78 58"],
    emails: [],
    type: "Bureau régional",
    responsable: "MOUSSA SAGARA",
    zones: ["Gao","Ménaka","Kidal"],
    partnersCarto: ["UNHCR","UNFPA","ACF","PLAN","FHRAOC"],
    coordsQuery: "Gao Mali"
  },

  {
    slug: 'sikasso',
    ville: "Base de Sikasso",
    adresse: "Sikasso/ Wayerma II derrière API",
    telephones: ["+223 74 72 79 67"],
    emails: ["aboubacrine@ong-amss.org","aboubacrine14@gmail.com"],
    type: "Bureau régional",
    responsable: "Mohamed Aboubacrine Ag Mohamed",
    zones: ["Sikasso","Koutiala","Bougouni"],
    partnersCarto: ["DDC","UE"],
    coordsQuery: "Sikasso Mali"
  },

  {
    slug: 'mopti',
    ville: "Base d'AMSS Mopti",
    adresse: "Mopti/Sevaré, Quartier Poudrière près de l’Hôpital Somine Dolo, en face de la mosquée",
    telephones: ["+223 76 14 13 71"],
    emails: ["oumaryanogo@ong-amss.org"],
    type: "Bureau régional",
    responsable: "Oumar Yanogo",
    zones: ["Mopti","Bandiagara","Bankass","Djenné","Douentza","Koro","Ténenkou","Youwarou"],
    partnersCarto: ["UNHCR","AEN","CRS","UNFPA"],
    coordsQuery: "Sévaré Mali"
  },

  {
    slug: 'segou',
    ville: "Base d'AMSS Ségou",
    adresse: "Ségou; Sébougou près de l'université",
    telephones: ["+223 76 02 33 50"],
    emails: ["medagabdallah@ong-amss.org"],
    type: "Bureau régional",
    responsable: "Mohamed Ag Abdallah",
    zones: ["Ségou","Barouéli","Tominian","San","Bla","Niono","Macina"],
    partnersCarto: ["UNHCR","EDUCO","Ayuda En Accion","CAEB","Cordaid","CRS","EUMC","ACF"],
    coordsQuery: "Ségou Mali"
  }
]
