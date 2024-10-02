import { useState } from 'react';

export default function LoginNavbar() {
  // Déclaration des états pour gérer le formulaire et les retours de l'API
  const [username, setUsername] = useState(''); // État pour le nom d'utilisateur
  const [password, setPassword] = useState(''); // État pour le mot de passe
  const [success, setSuccess] = useState(false); // État pour indiquer si la connexion est réussie
  const [error, setError] = useState(null); // État pour stocker les messages d'erreur

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);

    // Tentative de connexion à l'API
    try{
      // Envoi d'une requête POST à l'API
      const response = await fetch('https://orecipesapi.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password,
        })
      });

      const data = await response.json(); // Récupération des données de la réponse

      // Gestion de la réponse
      if (response.ok) {
        console.log('connexion réussie', data);
        setSuccess(true);
        setError(null);
      } else {
        setError(data.message || 'Erreur de connexion');
        setSuccess(false);
      }

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  // Rendu du composant
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ marginLeft: '250px' }}> {/* Barre de navigation fixée en haut avec un décalage à gauche */}
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Login</a>

        {/* Formulaire de connexion */}
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état username
          />
          <input
            type="password"
            className="form-control me-2"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état password
          />
          <button className="btn btn-outline-success" type="submit">Se connecter</button>
        </form>
      </div>
    </nav>
  );
}