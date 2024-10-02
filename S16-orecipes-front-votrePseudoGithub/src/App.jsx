import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './homepage/homepage';
import Navbar from './nav-bar/nav-bar';
import RecipeDetail from './recette-content/recipeDetail';
import LoginForm from './login-bar/login-bar';
import ScrollToTop from './ScrollToTop/ScrollToTop';


export default function App() {
  // Initialisation du state 'recipe' avec un tableau contenant une recette par défaut
  // Cela permet d'avoir des données à afficher même avant le chargement depuis l'API
  const [recipe, setRecipe] = useState([
    {
      id: 12345,
      title: "Cookie",
      thumbnail: "https://www.sunny-delices.fr/wp-content/uploads/2022/09/cookies-beurre-cacahouettes-sans-gluten-680x451.jpg",
      difficulty: "facile",
      descritpion: "Pour 10 cookies"
    }
  ]);

  // State pour gérer l'état de chargement
  const [loading, setLoading] = useState(true);
  // State pour gérer les erreurs potentielles
  const [error, setError] = useState(null);

  // useEffect pour charger les données au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les recettes
    const fetchRecipes = async () => {
      try {
        // Appel à l'API
        const response = await fetch("https://orecipesapi.onrender.com/api/recipes");

        // Vérification de la réponse
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        // Conversion de la réponse en JSON
        const data = await response.json();

        // Mise à jour du state avec les nouvelles recettes
        setRecipe(data);
      } catch (error) {
        // En cas d'erreur, on la log et on met à jour le state d'erreur
        console.error("Erreur lors de la récupération des recettes:", error);
        setError(error.message);
      } finally {
        // Qu'il y ait une erreur ou non, on indique que le chargement est terminé
        setLoading(false);
      }
    };

    // Appel de la fonction de fetch
    fetchRecipes();
  }, []); // Dépendances vides : l'effet ne s'exécute qu'au montage

  // Affichage d'un message de chargement si les données sont en cours de récupération
  if (loading) {
    return <p>Chargement des recettes...</p>
  }

  // Affichage d'un message d'erreur si quelque chose s'est mal passé
  if (error) {
    return <p>Erreur: {error}</p>;
  }

  // Rendu principal : on passe les recettes au composant HomePage
  // HomePage va gérer l'affichage des recettes avec un .map()
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container container-fluid">
        {/* Barre de connexion en haut de la page */}
        <LoginForm />
        <div className='page-principale row' style={{ display: 'flex' }}>
          {/* Barre de navigation latérale */}
          <Navbar recipes={recipe}/>

          {/* Contenu principal avec un décalage pour éviter le chevauchement */}
          {/* <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
        <HomePage recipes={recipe} />
      </div> */}

          <div className="content col-9 d-flex justify-content-center align-items-center" style={{ marginLeft: '310px' }}>
            {/* Conteneur principal pour le contenu, avec un style inline pour le décalage et le padding */}

            <Routes>

              {/* Composant Routes de React Router qui englobe toutes les définitions de route */}

              <Route path='/' element={<HomePage recipes={recipe} />} />
              {/* Route pour la page d'accueil
              - path='/' signifie que cette route correspond à l'URL racine
              - element spécifie le composant à rendre (HomePage)
              - La prop recipes est passée au composant HomePage */}

              <Route path="/recipe/:id" element={<RecipeDetail />} />
              {/* Route pour les détails d'une recette
              - path="/recipe/:id" utilise un paramètre dynamique :id
              - Cela permettra de capturer l'ID de la recette dans l'URL
              - Le composant RecipeDetail sera rendu pour cette route */}

              <Route path="*" element={<p>Page non trouvée</p>} />
              {/* Route par défaut (catch-all)
              - path="*" correspond à toutes les URL qui ne correspondent pas aux routes précédentes
              - Affiche un message simple "Page non trouvée"
              - C'est une bonne pratique pour gérer les URL invalides */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}