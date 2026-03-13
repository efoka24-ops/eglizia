# RAPPORT DE PROJET
## Site Internet de la Chapelle de Restauration en Christ

**Préparé pour :** Rév. Dr. Prophète Obi Louis, Pasteur Principal  
**Date :** Mars 2026  
**Projet :** Plateforme Web — Eglizia  

---

## 1. POURQUOI UN SITE INTERNET POUR LA CHAPELLE ?

### 1.1 Visibilité et Évangélisation
- **Présence en ligne 24h/24, 7j/7** : Le site permet à toute personne dans le monde entier de découvrir la Chapelle de Restauration en Christ, ses valeurs, son leadership et ses activités.
- **Outil d'évangélisation moderne** : Les réseaux sociaux sont éphémères. Un site web est un point d'ancrage permanent, professionnel et crédible.
- **Référencement Google** : Les personnes qui cherchent une église, une prière ou un soutien spirituel à Garoua/Yelwa pourront trouver la Chapelle directement via une recherche internet.

### 1.2 Communication avec les Fidèles
- **Programmes et événements** : Diffusion centralisée des cultes, séminaires, études bibliques et événements spéciaux.
- **Prédications en ligne** : Les fidèles empêchés ou à distance peuvent écouter/voir les prédications à tout moment.
- **Diffusion en direct (Live)** : Retransmission des cultes en direct via YouTube intégré au site.
- **Demandes de prière** : Les fidèles et visiteurs peuvent soumettre leurs sujets de prière en ligne.

### 1.3 Organisation et Gestion
- **Gestion des membres** : Suivi de la communauté, des départements et des responsables.
- **Gestion financière** : Suivi des dons et des dépenses de manière transparente.
- **Inscriptions aux événements** : Les membres peuvent s'inscrire en ligne aux activités.
- **Témoignages** : Espace dédié aux témoignages de la puissance de Dieu.

### 1.4 Image Professionnelle
- Un site web donne à la Chapelle une image **sérieuse, organisée et moderne**.
- Il renforce la **confiance** des visiteurs, partenaires et donateurs potentiels.
- Il distingue la Chapelle des autres assemblées qui n'ont pas cette présence.

### 1.5 Dons en Ligne
- Permet aux fidèles de la diaspora et aux bienfaiteurs de **donner facilement** via mobile money (Campay) ou autres moyens.
- Augmente les sources de financement de l'église.

---

## 2. FONCTIONNALITÉS DU SITE EGLIZIA

| Fonctionnalité | Description |
|---|---|
| Page d'accueil | Présentation de la Chapelle, vision, valeurs |
| Leadership | Présentation du pasteur principal et de l'équipe |
| Programmes | Calendrier des cultes et événements |
| Prédications | Vidéos et audios des prédications |
| Live Stream | Diffusion en direct des cultes via YouTube |
| Demandes de prière | Formulaire de soumission de prières |
| Témoignages | Partage de témoignages des fidèles |
| Dons en ligne | Paiement via Campay (Mobile Money) |
| Départements | Présentation des ministères de l'église |
| Contact | Informations de contact et localisation |
| Administration | Back-office pour gérer le contenu |

---

## 3. TECHNOLOGIES UTILISÉES

| Élément | Technologie | Avantage |
|---|---|---|
| Frontend | React + TypeScript | Rapide, moderne, maintenable |
| Style | Tailwind CSS | Design professionnel et responsive |
| Animations | Framer Motion | Interface fluide et attractive |
| Composants UI | Radix UI + Shadcn | Accessibilité, qualité professionnelle |
| Build | Vite | Compilation ultra-rapide |
| Paiement | Campay API | Mobile Money (Orange, MTN) |

---

## 4. BUDGET DÉTAILLÉ

### 4.1 Hébergement Web

| Service | Option | Coût Mensuel | Coût Annuel |
|---|---|---|---|
| **Vercel** (Recommandé) | Plan Gratuit | **0 FCFA** | **0 FCFA** |
| Vercel | Plan Pro | ~12 000 FCFA/mois | ~144 000 FCFA/an |
| Netlify | Plan Gratuit | **0 FCFA** | **0 FCFA** |
| Netlify | Plan Pro | ~11 500 FCFA/mois | ~138 000 FCFA/an |
| Hébergement VPS (OVH/Hostinger) | Basique | ~3 000 FCFA/mois | ~36 000 FCFA/an |

> **Recommandation :** Commencer avec **Vercel Gratuit** — suffisant pour le trafic actuel de la Chapelle (jusqu'à 100 000 visites/mois).

### 4.2 Nom de Domaine

| Domaine | Fournisseur | Coût Annuel |
|---|---|---|
| chapellerestauration.org | Namecheap / OVH | ~6 000 — 8 000 FCFA/an |
| chapellerestauration.com | Namecheap / OVH | ~6 000 — 10 000 FCFA/an |
| chapellerestauration.cm | Antic (Cameroun) | ~15 000 — 25 000 FCFA/an |

> **Recommandation :** Prendre un **.com** ou **.org** (~8 000 FCFA/an).

### 4.3 Certificat SSL (HTTPS)

| Option | Coût |
|---|---|
| **Inclus gratuitement** avec Vercel/Netlify | **0 FCFA** |
| Let's Encrypt (si VPS) | **0 FCFA** |

### 4.4 Email Professionnel (optionnel)

| Service | Coût |
|---|---|
| Zoho Mail (gratuit, 5 utilisateurs) | **0 FCFA** |
| Google Workspace | ~3 500 FCFA/utilisateur/mois |

> Permet d'avoir : pasteur@chapellerestauration.com

### 4.5 Maintenance et Mises à Jour

| Prestation | Fréquence | Coût Estimé |
|---|---|---|
| Mises à jour du contenu (membres, événements, prédications) | Hebdomadaire | 15 000 — 25 000 FCFA/mois |
| Corrections de bugs et améliorations mineures | Mensuelle | 10 000 — 20 000 FCFA/mois |
| Ajout de nouvelles fonctionnalités | Trimestrielle | 25 000 — 75 000 FCFA/trimestre |
| Support technique | Continu | Inclus dans la maintenance |

---

## 5. RÉCAPITULATIF BUDGÉTAIRE ANNUEL

### Option A — Budget Minimal (Recommandé pour démarrer)

| Poste | Coût Annuel |
|---|---|
| Hébergement (Vercel Gratuit) | **0 FCFA** |
| Nom de domaine (.com/.org) | **8 000 FCFA** |
| SSL | **0 FCFA** |
| Email (Zoho gratuit) | **0 FCFA** |
| Maintenance mensuelle (15 000/mois) | **180 000 FCFA** |
| **TOTAL ANNUEL** | **188 000 FCFA** |

### Option B — Budget Confortable

| Poste | Coût Annuel |
|---|---|
| Hébergement (Vercel Pro) | **144 000 FCFA** |
| Nom de domaine (.com) | **8 000 FCFA** |
| SSL | **0 FCFA** |
| Email professionnel (Google Workspace, 2 comptes) | **84 000 FCFA** |
| Maintenance mensuelle (25 000/mois) | **300 000 FCFA** |
| Améliorations trimestrielles | **200 000 FCFA** |
| **TOTAL ANNUEL** | **736 000 FCFA** |

### Option C — Budget Premium

| Poste | Coût Annuel |
|---|---|
| Hébergement VPS dédié | **36 000 FCFA** |
| Nom de domaine (.cm + .com) | **33 000 FCFA** |
| SSL | **0 FCFA** |
| Google Workspace (5 comptes) | **210 000 FCFA** |
| Maintenance complète (30 000/mois) | **360 000 FCFA** |
| Développements majeurs | **500 000 FCFA** |
| **TOTAL ANNUEL** | **1 139 000 FCFA** |

---

## 6. RETOUR SUR INVESTISSEMENT

### Ce que le site rapporte à la Chapelle :

1. **Dons en ligne** : Même 5 donateurs à 5 000 FCFA/mois = 300 000 FCFA/an (couvre le budget minimal)
2. **Croissance de la communauté** : Nouveaux fidèles qui découvrent l'église en ligne
3. **Rayonnement international** : La diaspora camerounaise peut suivre et soutenir l'église
4. **Économies** : Moins de flyers, affiches, appels téléphoniques pour communiquer
5. **Organisation** : Meilleure gestion interne, gain de temps pour les responsables

---

## 7. CONCLUSION ET RECOMMANDATION

Le site internet est un **investissement stratégique** pour la Chapelle de Restauration en Christ. Il renforce la mission d'évangélisation, améliore la communication et ouvre de nouvelles sources de revenus.

**Nous recommandons l'Option A** pour démarrer :
- **Coût : 188 000 FCFA/an** (soit environ **15 700 FCFA/mois**)
- Hébergement gratuit sur Vercel
- Nom de domaine professionnel
- Maintenance régulière du contenu

Le site peut évoluer progressivement vers les options B ou C selon la croissance de la communauté et les besoins.

---

**Préparé par :** Équipe technique Eglizia  
**Contact :** chapellerestauration57@gmail.com  
**Site :** https://eglizia.vercel.app
