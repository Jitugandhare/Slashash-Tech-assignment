import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesComponent = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('https://backend-9u85y37qu-jitu-gandhares-projects.vercel.app/api/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>{favorite.quote} - {favorite.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesComponent;
