import React from 'react';
import { renderData } from './RenderButtonDetails';

export function renderRecomendation(recomendation, path) {
  const six = 6;
  return recomendation.map((rec, index) => {
    if (index < six) {
      return (
        <div data-testid={ `${index}-recomendation-card` } className="recomendation">
          <img
            src={ path.includes('/comidas') ? rec.strDrinkThumb
              : rec.strMealThumb }
            alt="alguma coisa"
          />
          <h2 data-testid={ `${index}-recomendation-title` }>
            { path.includes('/comidas') ? rec.strDrink
              : rec.strMeal }
          </h2>
        </div>
      );
    }
    return undefined;
  });
}

export function renderCategory(path, recipe) {
  if (path.includes('/comidas')) {
    return (
      <h2
        data-testid="recipe-category"
        className="recipe-category"
      >
        {recipe.strCategory}
      </h2>
    );
  }
  return (
    <div>
      <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
    </div>
  );
}

export function renderVideo(path, recipe) {
  if (path.includes('/comidas')) {
    return (
      <div className="video-recipe">
        <iframe
          data-testid="video"
          width="100%"
          height="100%"
          src={ recipe.strYoutube
            ? recipe.strYoutube.replace('watch?v=', 'embed/') : undefined }
          frameBorder="0"
          allow="accelerometer; autoplay;
           clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
  }
  return undefined;
}

export function renderIgredients(recipe, progress, checkIngredients, handleIngredients) {
  const array = Object.keys(recipe);
  const arrayVazio = [];
  array.map((key) => {
    if (key.includes('strIngredient') && recipe[key] !== null && recipe[key] !== '') {
      arrayVazio.push(recipe[key]);
      return arrayVazio;
    }
    return undefined;
  });
  if (progress) {
    return arrayVazio.map((igr, index) => (
      <label htmlFor={ igr } key={ igr } data-testid={ `${index}-ingredient-step` }>
        <li>
          <input
            type="checkbox"
            id={ `${index}ingredient-step` }
            className="ingredient-step-list"
            value={ checkIngredients[`value${index}`] }
            onChange={ (e) => handleIngredients(index, e.target) }
            checked={ checkIngredients[`value${index}`] }
          />
          { igr }
          -
          { recipe[`strMeasure${index + 1}`] }
        </li>
      </label>
    ));
  }
  return arrayVazio.map((igr, index) => (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ igr }
    >
      { igr }
      -
      { recipe[`strMeasure${index + 1}`] }
    </li>
  ));
}

export function confereFavorite(id) {
  const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return storageFavorites.some((rec) => rec.id === id);
}

export function adcFavorite(recipe) {
  const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (recipe.idMeal) {
    const objRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    const array = [...storageFavorites, objRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  } else {
    const objRecipe = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    const array = [...storageFavorites, objRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  }
}

export function removeFavorite(recipe) {
  const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (recipe.idMeal) {
    const array = storageFavorites.filter((rec) => rec.id !== recipe.idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  } else {
    const array = storageFavorites.filter((rec) => rec.id !== recipe.idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
  }
}

export function didUpDateRecipesInProgress(p, recipe, checkIngredients, setCheks) {
  const tam = document.querySelectorAll('.ingredient-step-list');
  const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let value = {};
  if (recipe !== '' && checkIngredients === '' && !storageProgress) {
    tam.forEach((t, i) => {
      value = {
        ...value,
        [`value${i}`]: false,
      };
    });
    setCheks(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      recipe,
      value,
    }));
  }
  if (p.checkIngredients !== checkIngredients) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      recipe,
      value: checkIngredients,
    }));
  }
}

export function checkIngredientsToButton(checkIngredients) {
  const tam = document.querySelectorAll('.ingredient-step-list').length;
  const ingredientsOk = Object.values(checkIngredients);
  const verica = ingredientsOk.every((value) => value === true);
  if (verica === true && ingredientsOk.length === tam) {
    return false;
  }
  return true;
}

export function redirectToMadeRecipes(history, recipe) {
  const storageMade = JSON.parse(localStorage.getItem('doneRecipes'));
  const { idMeal, idDrink } = recipe;
  if (idMeal) {
    const recipeMade = {
      id: idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: renderData(),
      tags: recipe.strTags ? recipe.strTags.split(', ') : '',
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...storageMade, recipeMade]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({}));
  }
  if (idDrink) {
    const recipeMade = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: renderData(),
      tags: recipe.strTags ? recipe.strTags.split(', ') : '',
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...storageMade, recipeMade]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({}));
  }
  history.push('/receitas-feitas');
}
