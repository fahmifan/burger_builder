import React from 'react';

import Aux from '../../../hoc/Auxiliarys';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
        </li>);
    })
  // make it an aray

  return (
    <Aux>
      <h3>You Order</h3>
      <p>A delicious Burger with :</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </Aux>
  );
};

export default orderSummary;