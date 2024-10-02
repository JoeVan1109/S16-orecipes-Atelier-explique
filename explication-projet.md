# Projet O'Recipes : Application React de Recettes

## Introduction

Ce projet a pour but de créer une application web utilisant React pour afficher et gérer des recettes de cuisine. L'application se connecte à une API externe pour récupérer les données des recettes et offre diverses fonctionnalités telles que la navigation entre les recettes, l'affichage des détails, et un formulaire de connexion.

## Configuration Initiale

### Création du Projet

- Le projet a été initialisé avec Vite, un outil de build rapide pour les applications web modernes.
- Le fichier `package.json` contient la configuration du projet :

```json
{
  "name": "s16-orecipes-front-votrepseudogithub",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@biomejs/biome": "1.9.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "globals": "^15.9.0",
    "vite": "^5.4.1"
  }
}
```
### Point d'Entrée de l'Application

Le fichier `index.js` sert d'entrée de l'application

```javascript
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <App />
);
```

## Composants Principaux

### App.jsx

Le composant `App` gère l'état global des recettes et configure le routage :

```javascript
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './homepage/homepage';
import Navbar from './nav-bar/nav-bar';
import RecipeDetail from './recette-content/recipeDetail';
import LoginForm from './login-bar/login-bar';
import ScrollToTop from './ScrollToTop/ScrollToTop';

export default function App() {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://orecipesapi.onrender.com/api/recipes");
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) return <p>Chargement des recettes...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container container-fluid">
        <LoginForm />
        <div className='page-principale row' style={{ display: 'flex' }}>
          <Navbar recipes={recipe}/>
          <div className="content col-9 d-flex justify-content-center align-items-center" style={{ marginLeft: '310px' }}>
            <Routes>
              <Route path='/' element={<HomePage recipes={recipe} />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="*" element={<p>Page non trouvée</p>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
```

### HomePage.jsx

Le composant `HomePage` affiche la liste des recettes : 

```javascript
import { Link } from 'react-router-dom';

export default function HomePage({ recipes }) {
  return (
    <div>
      <h1 className="mb-4">Liste des Recettes</h1>
      <div className="row">
        {recipes.map((recette) => (
          <div id={`recette-${recette.id}`} className="col-sm-12 col-md-6 col-lg-4 mb-4" key={recette.id}>
            <div className="card h-100">
              <img src={recette.thumbnail} className="card-img-top" alt={recette.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recette.title}</h5>
                <p className="card-text">Difficulté : {recette.difficulty}</p>
                <Link to={`/recipe/${recette.id}`} className="btn btn-primary mt-auto">Voir la recette</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### RecipeDetail.jsx

Le composant `RecipeDetail` affiche les détails d'une recette spécifique :

```javascript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function RecipeDetail() {
  const { id } = useParams();
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://orecipesapi.onrender.com/api/recipes/${id}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération de la recette");
        
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Chargement des détails de la recette...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!recipe) return <p>Recette non trouvée</p>;

  return (
    <div className="recipe-detail container mt-5">
      <ScrollToTop />
      {/* Détails de la recette */}
      {/* ... */}
    </div>
  );
}
```
### Navbar.jsx

Le composant `Navbar` permet de naviguer entre les recettes :

```javascript
import { NavLink } from 'react-router-dom'; 

export default function Navbar({ recipes }) {
  return (
    <div className="d-flex flex-column p-3 bg-dark col-3" style={{ width: '250px', height: '100vh', position: 'fixed', top: '0', left: '0' }}>
      {/* Lien vers la page d'accueil */}
      {/* Liste des liens vers les recettes */}
      {recipes.map((recette) => (
        <NavLink key={recette.id} to={`/recipe/${recette.id}`} className={({ isActive }) => isActive ? 'd-none' : 'list-group-item list-group-item-action bg-dark text-light nav-link'}>
          {recette.title}
        </NavLink>
      ))}
    </div>
  );
}
```	

### ScrollToTop.jsx

Le composant `ScrollToTop` permet de faire défiler la page vers le haut lors du changement de route :

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
```

# Fonctionnalités Clés

## Chargement des Recettes

Le chargement des recettes est une fonctionnalité centrale de l'application, réalisée comme suit :

1. **Utilisation du Hook `useEffect`** :
   ```javascript
   useEffect(() => {
     const fetchRecipes = async () => {
       // Logique de récupération des recettes
     };
     fetchRecipes();
   }, []);
   ```	
- Ce hook s'exécute après le premier rendu du composant.
- Le tableau de dépendances vide [] assure que l'effet ne s'exécute qu'une seule fois au montage du composant.

2. **Requête API avec** `fetch` :

```javascript
const response = await fetch("https://orecipesapi.onrender.com/api/recipes");
const data = await response.json();
```

3. **Gestion des États** :

```javascript
const [recipe, setRecipe] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Dans useEffect
setRecipe(data);
setLoading(false);
```

- Utilisation de useState pour gérer l'état des recettes, du chargement et des erreurs.
- Mise à jour de l'état avec les données récupérées.

4. Affichage Dynamique :

```javascript
{recipes.map((recette) => (
  // Rendu de chaque recette
))}
```

- Utilisation de la méthode map pour générer dynamiquement les éléments JSX pour chaque recette.

## Navigation avec React Router

La navigation est gérée efficacement grâce à React Router :

1. Configuration du Router :

```javascript
<Router>
  <Routes>
    <Route path='/' element={<HomePage recipes={recipe} />} />
    <Route path="/recipe/:id" element={<RecipeDetail />} />
  </Routes>
</Router>
```
- Définition des routes pour la page d'accueil et les détails des recettes.

2. Utilisation de `Link` et `NavLink` pour la navigation :

```javascript
<Link to={`/recipe/${recette.id}`}>Voir la recette</Link>

<NavLink to={`/recipe/${recette.id}`} className={({ isActive }) => 
  isActive ? 'd-none' : 'list-group-item list-group-item-action'
}>
  {recette.title}
</NavLink>
```

- `Link` pour la navigation simple.
- `NavLink` pour une navigation avec gestion de l'état actif.

3. Gestion des Paramètres d'URL :

```javascript
const { id } = useParams();
```

- Utilisation de `useParams` pour récupérer l'ID de la recette dans l'URL.

## Formulaire de Connexion

Le formulaire de connexion permet l'authentification des utilisateurs :

1. Structure du Formulaire :

```javascript
<form onSubmit={handleSubmit}>
  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  <button type="submit">Se connecter</button>
</form>
```

2. Gestion de la Soumissions :

```javascript
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('https://orecipesapi.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password }),
    });
    // Traitement de la réponse
  } catch (error) {
    // Gestion des erreurs
  }
};
```

- Prévention du comportement par défaut du formulaire.
- Envoi des données de connexion à l'API via une requête POST.
- Gestion de la réponse et des erreurs potentielles.

## Conclusion

Ce projet démontre l'application pratique de concepts clés en React :

- Gestion d'État : Utilisation efficace de useState et useEffect pour gérer les  données et les effets secondaires.
- **Routage** : Implémentation d'une navigation fluide avec React Router.
- **Intégration API** : Récupération et affichage de données depuis une API externe.
- **Formulaires** : Gestion des entrées utilisateur et soumission de données.

Ces fonctionnalités forment une base solide pour le développement d'applications web React plus complexes, offrant une expérience d'apprentissage complète pour les développeurs en formation.