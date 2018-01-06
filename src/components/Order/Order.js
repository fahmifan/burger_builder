import React from 'react';

import classes from './Order.css';

const order = (props) => {
  console.log(props.ingredients);
  const ingredients = [];
  for(let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span 
    key={ig.name}
    style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      border: '1px solid #ccc',
      padding: '5px',
      margin: '5px'
    }}
    >{ig.name}({ig.amount})</span>
  })
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
};

export default order;