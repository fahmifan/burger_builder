import React from 'react';

import classes from './Input.css';

const input = (props) => {
  switch(props.inputType) {
    case ('input'): 
      inputElement = <input className={classes.InputElement} {...props}/>;
      break;
    case ('textarea'):
      inputElemnt = <textarea className={classes.InputElement} {...props}/>;
      break;
    default: 
      inputElement = <input className={classes.InputElement} {...props}/>;
  }
  
  return (<div className={classes.Input}>
    <label htmlFor="" className={classes.Label}>{props.label}</label>
    {inputElement}
  </div>);
};

export default;