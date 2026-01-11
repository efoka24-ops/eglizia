# 🙏 Eglizia - Site Web d'Église

Un site web moderne et complet pour gérer une église, avec fonctionnalités pour les services, événements, actualités et témoignages.

## 🚀 Technologie

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Base de données:** JSON (data.json)
- **Déploiement:** Render (backend) + Netlify (frontend)

## 📁 Structure

```
eglizia/
├── backend/
│   ├── server.js
│   ├── data.json
│   ├── package.json
│   └── services/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🏃 Démarrage rapide

### Backend
```bash
cd backend
npm install
npm start
```

Le serveur sera disponible sur `http://localhost:5001`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:5173`

## 📚 API Endpoints

### Église
- `GET /api/church` - Informations de l'église

### Services
- `GET /api/services` - Tous les services
- `POST /api/services` - Ajouter un service
- `PUT /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service

### Événements
- `GET /api/events` - Tous les événements
- `POST /api/events` - Ajouter un événement
- `PUT /api/events/:id` - Modifier un événement
- `DELETE /api/events/:id` - Supprimer un événement

### Actualités
- `GET /api/news` - Toutes les actualités
- `POST /api/news` - Ajouter une actualité
- `PUT /api/news/:id` - Modifier une actualité
- `DELETE /api/news/:id` - Supprimer une actualité

### Leadership
- `GET /api/leadership` - Toute l'équipe
- `GET /api/leadership/:id` - Un responsable

### Témoignages
- `GET /api/testimonies` - Tous les témoignages
- `POST /api/testimonies` - Ajouter un témoignage

### Contact
- `GET /api/contacts` - Tous les messages
- `POST /api/contacts` - Envoyer un message

## 🎨 Personnalisation

### Couleurs
Modifier `frontend/tailwind.config.js` pour changer les couleurs de l'église.

### Contenu
Editer `backend/data.json` pour ajouter:
- Infos de l'église
- Services
- Équipe de direction
- Événements
- Actualités
- Paramètres

## 🔐 Variables d'environnement

### Backend (.env)
```
PORT=5001
```

### Frontend (.env.production)
```
VITE_API_URL=https://votre-backend.com
```

## 🚀 Déploiement

### Backend sur Render
1. Créer un compte Render
2. Connecter le repo GitHub
3. Déployer l'application Node.js
4. Définir `PORT=5001`

### Frontend sur Netlify
1. Connecter le repo GitHub
2. Build command: `cd frontend && npm run build`
3. Publish directory: `frontend/dist`

## 📧 Contact & Sujet

Modifiez `backend/data.json` pour ajouter vos infos de contact:

```json
{
  "church": {
    "name": "Nom de votre église",
    "email": "contact@votreeglise.com",
    "phone": "+237 XXX XXX XXX",
    "address": "Adresse"
  }
}
```

## 🙏 Merci

Bienvenue à Eglizia! Que ce site serve à renforcer votre communauté de foi.

---

Créé avec ❤️ pour les églises
