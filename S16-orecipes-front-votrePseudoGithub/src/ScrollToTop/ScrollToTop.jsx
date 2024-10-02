import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop () {
  // Utilisation du hook useLocation pour obtenir l'objet location actuel
  // On extrait la propriété 'pathname' qui représente le chemin de l'URL actuelle
  const { pathname } = useLocation();

  // Utilisation du hook useEffect pour exécuter un effet secondaire
  useEffect(() => {
    // Cette fonction fait défiler la fenêtre vers le haut de la page (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Ce tableau de dépendances indique que l'effet doit s'exécuter chaque fois que 'pathname' change

  // Ce composant ne rend rien visuellement, il gère seulement le défilement
  // Il n'y a donc pas de JSX retourné
}