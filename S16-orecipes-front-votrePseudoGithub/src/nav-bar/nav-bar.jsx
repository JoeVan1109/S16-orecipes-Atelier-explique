import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './nav-bar.css'

export default function Navbar({ recipes }) {
  return (
    // Conteneur principal de la barre de navigation
    // Utilise des classes Bootstrap pour le style et le positionnement
    <div className="d-flex flex-column p-3 bg-dark col-3" style={{ width: '250px', height: '100vh', position: 'fixed', top: '0', left: '0' }}>

      {/* Lien vers la page d'accueil */}
      <Link className="text-light pb-3" to={`/`} >
        Accueil
      </Link>

      {/* Liste des liens vers les recettes */}
      <div className="list-group list-group-flush">
        {/* Itération sur le tableau des recettes */}
        {recipes.map((recette) => (
          // Version commentée utilisant Link
          // <Link className="list-group-item list-group-item-action bg-dark text-light" to={`/recipe/${recette.id}`} key={recette.id} >
          //   {recette.title}
          // </Link>

          // Utilisation de NavLink pour chaque recette
          <NavLink
            key={recette.id}  // Clé unique pour chaque élément de la liste
            to={`/recipe/${recette.id}`}  // Lien vers la page de détail de la recette
            className={({ isActive }) =>
              isActive
                ? "d-none"  // Cache le lien si actif
                : "list-group-item list-group-item-action bg-dark text-light nav-link"  // Remet le lien si non cliqué
            
            }
          >
            {recette.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}


