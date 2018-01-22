import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Chesse', type: 'chesse'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
    {controls.map( ctrl => <BuildControl 
      key={ctrl.label} 
      label={ctrl.label} 
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientDeduct(ctrl.type)}
      isdisabled={props.disabled[ctrl.type]}
      /> )}
      <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;