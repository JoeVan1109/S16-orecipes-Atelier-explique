import { Link } from 'react-router-dom'; 

export default function HomePage({ recipes }) {
  return (
    <div>
      <h1 className="mb-4">Liste des Recettes</h1>
      <div className="row">
        {/* Utilisation de map pour itérer sur chaque recette */}
        {recipes.map((recette) => (
          // Création d'une carte pour chaque recette
          <div id={`recette-${recette.id}`} className="col-sm-12 col-md-6 col-lg-4 mb-4" key={recette.id}>
            <div className="card h-100">
              {/* Image de la recette */}
              <img
                src={recette.thumbnail}
                className="card-img-top"
                alt={recette.title}
              />
              <div className="card-body d-flex flex-column">
                {/* Titre de la recette */}
                <h5 className="card-title">{recette.title}</h5>
                {/* Difficulté de la recette */}
                <p className="card-text">Difficulté : {recette.difficulty}</p>
                {/* Description de la recette */}
                <p className="card-text">{recette.description}</p>
                {/* Lien vers la page détaillée de la recette */}
                <Link to={`/recipe/${recette.id}`} className="btn btn-primary mt-auto">
                  Voir la recette
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

{/* 
  Commentaire sur l'utilisation de NavLink (actuellement en commentaire dans le code original)

  <NavLink
    className={({ isActive }) => {
      // La fonction de callback doit retourner la classe CSS
      // Pour déterminer quelle classe renvoyer, on vérifie si le lien est actif ou non
      // Cette information est reçue en paramètre sous forme d'un objet contenant une clé isActive
      return isActive ? 'menu-link menu-link--selected' : 'menu-link';
    }}
    to="/"
  ></NavLink>

  Ce code montre comment utiliser NavLink avec une classe conditionnelle basée sur l'état actif du lien.
  - Si le lien est actif (correspond à l'URL actuelle), la classe 'menu-link menu-link--selected' est appliquée.
  - Sinon, seule la classe 'menu-link' est appliquée.
  Cela permet de styliser différemment les liens de navigation actifs.
*/}