import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      chesse: ingredients.chesse,
      meat: ingredients.meat
    }
  }
}

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredient = dispatch => {
  axios.get('https://react-myburger-19cb8.firebaseio.com/ingredients.json')
    .then(res => {
      dispatch(setIngredient(res.data))
    })
    .catch(error => {
      dispatch(fetchIngredientFailed())
    })
}