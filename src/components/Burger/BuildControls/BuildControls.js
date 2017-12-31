import React from 'react';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Chesse', type: 'chesse'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div>
    {controls.map( ctrl => <BuildControl key={ctrl.label} label={ctrl.label} /> )}
  </div>
);

export default buildControls;