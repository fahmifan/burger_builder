import * as actionTypes from './action';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    chesse: 0,
    bacon: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  chesse: 0.4,
  bacon: 1.3,
  meat: 0.8
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      }
    case actionTypes.REMOVE_INGREDIENT: 
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }        
      }
    default: 
      return state
  }
};

export default reducer;