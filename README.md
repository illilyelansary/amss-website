# Site Web AMSS - Association Malienne pour la Survie au Sahel

Site web moderne et responsive pour l'AMSS, développé avec React, Tailwind CSS et Netlify CMS pour la gestion de contenu.

## 🌟 Fonctionnalités

- **Design moderne et responsive** - Compatible mobile et desktop
- **Navigation intuitive** - Menus et sous-menus organisés
- **Gestion de contenu (CMS)** - Interface d'administration via Netlify CMS
- **Pages dynamiques** - Actualités, projets, partenaires, équipe
- **Optimisé SEO** - Structure et métadonnées optimisées
- **Performance** - Chargement rapide et optimisé

## 🚀 Technologies Utilisées

- **Frontend** : React 19, Vite, Tailwind CSS
- **Routing** : React Router DOM
- **CMS** : Netlify CMS
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

Le site utilise Netlify CMS pour la gestion de contenu. L'interface d'administration est accessible à `/admin/`.

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

