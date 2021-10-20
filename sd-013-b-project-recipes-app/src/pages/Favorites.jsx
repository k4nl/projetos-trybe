import React, { useEffect, useState } from 'react';
import HeaderExplore from '../components/HeaderExplore';
import FavoriteCards from '../components/FavoriteCards';

export default function ReceitasFeitas() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesFiltered, setFavoritesFiltered] = useState([]);

  useEffect(() => {
    const getFavorites = () => {
      const favoritesResults = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesResults !== null) {
        setFavorites(favoritesResults);
        setFavoritesFiltered(favoritesResults);
      }
    };

    getFavorites();
  }, []);

  const onFavoriteClick = (id) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    const newFilter = favoritesFiltered.filter((favorite) => favorite.id !== id);
    setFavoritesFiltered(newFilter);
  };

  const onFilterClick = ({ target: { name } }) => {
    if (name === 'all') {
      setFavoritesFiltered(favorites);
      return;
    }
    if (name === 'food') {
      const newFilter = favorites.filter((favorite) => (
        favorite.type === 'comida'));

      setFavoritesFiltered(newFilter);
      return;
    }

    const newFilter = favorites.filter((favorite) => favorite.type === 'bebida');
    setFavoritesFiltered(newFilter);
  };

  return (
    <section>
      <HeaderExplore titlePage="Receitas Favoritas" />
      Receitas Favoritas
      <div className="filter-section">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ onFilterClick }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="food"
          onClick={ onFilterClick }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ onFilterClick }
        >
          Drinks
        </button>
      </div>
      <div className="favorite-section">
        { favoritesFiltered.map((favorite, index) => (
          <FavoriteCards
            key={ favorite.id }
            recipe={ favorite }
            index={ index }
            onFavoriteClick={ onFavoriteClick }
          />
        )) }
      </div>
    </section>
  );
}
