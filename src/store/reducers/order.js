import * as actionType from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false
};

const reducer = (state = initState , action) => {
  switch(action.type) {
    case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionType.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.order,
        id: action.id
      } 
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false
      }
    case actionType.PURCHASE_BURGER_FAIL: 
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
};

export default reducer;