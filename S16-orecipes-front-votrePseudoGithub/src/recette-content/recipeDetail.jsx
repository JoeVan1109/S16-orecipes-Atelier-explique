import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './recette-content.css';
import ScrollToTop from '../ScrollToTop/ScrollToTop'

export default function RecipeDetail() {
  // Récupère l'ID de la recette depuis l'URL
  const { id } = useParams();
  
  // États pour gérer les données de la recette, le chargement et les erreurs
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effet pour charger les détails de la recette
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Appel à l'API pour récupérer les détails de la recette
        const response = await fetch(`https://orecipesapi.onrender.com/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la recette");
        }

        const data = await response.json();
        setRecipe(data); // Mise à jour de l'état avec les données de la recette
      } catch (error) {
        setError(error.message); // Gestion des erreurs
      } finally {
        setLoading(false); // Fin du chargement, qu'il y ait une erreur ou non
      }
    };

    fetchRecipe(); // Appel de la fonction de fetch
  }, [id]); // L'effet se déclenche à chaque changement de l'ID

  // Affichage pendant le chargement
  if (loading) {
    return <p>Chargement des détails de la recette...</p>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Si la recette n'est pas trouvée
  if (!recipe) {
    return <p>Recette non trouvée</p>;
  }

  // Rendu des détails de la recette
  return (
    <div className="recipe-detail container mt-5">
      <ScrollToTop />

      <div className="recipe-header position-relative mb-5 mt-5">
        <img
          src={recipe.thumbnail}
          alt={recipe.title}
          className="w-100 img-fluid recipe-image"
          style={{ height: '80vh', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-dark bg-opacity-75 recipe-infos">
          <h1 className="display-4 text-white fw-bold">{recipe.title}</h1>
          <p className="text-white-50 mb-0">
            <span className="me-3">
              <i className="bi bi-person-fill"></i> {recipe.author}
            </span>
            <span>
              <i className="bi bi-star-fill"></i> {recipe.difficulty}
            </span>
          </p>
        </div>
      </div>

      <div className="row">
        {/* Colonne pour les Ingrédients */}
        <div className="col-md-6">
      <h3 className="my-4">Ingrédients :</h3>
      <ul className="list-group ingredients-list mb-4">
        {recipe.ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-3"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                id={`ingredient-${ingredient.id}`}
                className="form-check-input me-3 case"
              />
              <label htmlFor={`ingredient-${ingredient.id}`} className="form-check-label">
                <span className="badge bg-primary badge-pill px-3 py-2 me-2">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                {ingredient.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>

        {/* Colonne pour les Instructions */}
        <div className="col-md-6">
          <h3 className="my-4">Instructions :</h3>
          <ol className="list-group list-group-numbered instructions-list p-3 bg-light rounded border-0">
            {recipe.instructions.map((instruction, index) => (
              <li key={`${recipe.id}-${index}`} className="list-group-item border-0 px-0 py-2">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}