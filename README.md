# Site Web AMSS - Association Malienne pour la Survie au Sahel

Site web moderne et responsive pour l'AMSS, développé avec React, Tailwind CSS et des fichiers de données (src/data) pour la gestion de contenu.

## 🌟 Fonctionnalités

- **Design moderne et responsive** - Compatible mobile et desktop
- **Navigation intuitive** - Menus et sous-menus organisés
- **Gestion de contenu** - Projets issus du registre officiel `data/AMSS_Modele_Officiel_Programmes.xlsx` ; actualités et recrutements dans `src/data/*.js`
- **Pages dynamiques** - Actualités, projets, partenaires, équipe
- **Optimisé SEO** - Structure et métadonnées optimisées
- **Performance** - Chargement rapide et optimisé

## 🚀 Technologies Utilisées

- **Frontend** : React 19, Vite, Tailwind CSS
- **Routing** : React Router DOM
- **Déploiement** : Netlify
- **Gestion de version** : Git/GitHub

## 📁 Structure du Projet

```
amss-website/
├── public/
│   ├── admin/              # Interface CMS
│   └── images/             # Images statiques
├── src/
│   ├── components/         # Composants React
│   ├── pages/             # Pages du site
│   └── assets/            # Ressources (images, etc.)
├── content/               # Contenu géré par CMS
│   ├── actualites/        # Articles d'actualité
│   ├── projets/           # Projets AMSS
│   ├── partenaires/       # Partenaires
│   ├── equipe/            # Membres de l'équipe
│   └── pages/             # Pages statiques
└── netlify.toml           # Configuration Netlify
```

## 🎨 Sections du Site

### Pages Principales
- **Accueil** - Hero section, actualités récentes, aperçu des domaines
- **À Propos** - Histoire, mission, vision, équipe de direction
- **Éducation** - Programmes éducatifs détaillés avec images
- **Contact** - Formulaire, coordonnées, bureaux régionaux

### Domaines d'Intervention
1. Éducation et Formation
2. Santé et Nutrition
3. Sécurité Alimentaire
4. WASH (Eau, Assainissement, Hygiène)
5. Protection et VBG
6. Gouvernance et Paix
7. Environnement et Climat
8. Microfinance et Entreprenariat

### Zones d'Intervention
- Tombouctou (siège principal)
- Gao, Ménaka, Mopti, Ségou, Sikasso, Bamako, Taoudénit

## 🛠️ Installation et Développement

### Prérequis
- Node.js 18+
- pnpm (gestionnaire de paquets)

### Installation
```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd amss-website

# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm run dev
```

### Build de production
```bash
pnpm run build
```

## 📝 Gestion de Contenu (CMS)

Le site utilise des fichiers de données (src/data) pour la gestion de contenu. L'interface d'administration est accessible à `/admin/`.

### Collections disponibles :
- **Actualités** - Articles et nouvelles
- **Projets** - Projets AMSS avec détails complets
- **Partenaires** - Organisations partenaires
- **Équipe** - Membres de l'équipe
- **Rapports** - Rapports annuels et documents
- **Pages** - Contenu des pages statiques

### Authentification
L'accès au CMS nécessite une authentification via Netlify Identity.

## 🌐 Déploiement

Le site est configuré pour un déploiement automatique sur Netlify :

1. **Connexion GitHub** - Le repo est connecté à Netlify
2. **Build automatique** - Déclenchement automatique à chaque push
3. **CMS intégré** - Interface d'administration accessible
4. **Domaine personnalisé** - Configuration possible

### Variables d'environnement
Aucune variable d'environnement requise pour le fonctionnement de base.

## 📊 Statistiques AMSS

- **460+** employés
- **8** régions d'intervention
- **30+** années d'expérience
- **200K+** bénéficiaires totaux
- **100+** projets réalisés

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📞 Support

Pour toute question technique ou suggestion :
- Email : info@ong-amss.org
- Téléphone : +223 21 92 10 48

## 📄 Licence

Ce projet est développé pour l'AMSS - Association Malienne pour la Survie au Sahel.

---

**AMSS** - Pour la Survie et le Développement au Sahel depuis 1991



## 🔒 Sécurité (à respecter)

- **Générateur de badges** : la page `/badge-employe` n'est **jamais** publiée sur le site public.
  Pour l'utiliser, lancez le site en local (`pnpm dev`) puis ouvrez `http://localhost:5173/badge-employe`.
- **Dépendances** : Netlify installe exactement les versions de `pnpm-lock.yaml` (`--frozen-lockfile`).
  Après toute modification de `package.json`, lancez `pnpm install` en local et envoyez aussi `pnpm-lock.yaml`.
  Dependabot propose chaque semaine les mises à jour de sécurité : relisez-les avant de les fusionner.
- **CSP** : la liste des services externes autorisés est dans `vite.config.js`. Ajoutez-y tout nouveau domaine intégré.
- **Photos** : retirez les métadonnées (position GPS) des photos avant de les publier.
- **Secrets** : ne jamais mettre de mot de passe, clé ou fichier `.env` dans le dépôt.
- **Coordonnées de don** : à renseigner dans `COORDONNEES_DON` en haut de `src/pages/DonPage.jsx`.

## 📊 Mettre à jour les projets

Les projets du site proviennent **uniquement** du registre officiel (même fichier que Power BI).

1. Mettre à jour le registre dans SharePoint et vérifier que l’onglet `02_CONTROLES` affiche « OK ».
2. Remplacer `data/AMSS_Modele_Officiel_Programmes.xlsx` par la nouvelle version.
3. Lancer `pnpm run migrate:projets`, lire les avertissements, puis envoyer sur GitHub
   `data/AMSS_Modele_Officiel_Programmes.xlsx` **et** `src/data/projetsData.js`.

Règles : seuls les statuts Actif, Clôture en cours, Suspendu et Clôturé sont publiés ; les fiches
« À qualifier » ou « Archivé » restent invisibles. Les composantes s’affichent avec leur programme
parent. Un projet dont la date de fin est dépassée passe automatiquement dans « Terminés ».
Les régions suivent le découpage administratif en vigueur (Bandiagara, Douentza, San, Koutiala, Bougouni…).
