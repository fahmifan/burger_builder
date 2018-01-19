import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    order: order 
  }
}

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = order => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data, order))
      })
      .catch(error => {
        console.log(error)
        dispatch(purchaseBurgerFailed(error))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}