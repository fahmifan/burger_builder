import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let validationError = null;

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>
      {`${props.elementType} ${props.errorMessage}`}</p>;
  }

  switch(props.elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.change}/>;
      break;
    case ('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.change}/>;
      break;
    case ('select'): 
      inputElement = <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.change}>

        {props.elementConfig.options.map(option => (
          <option 
            key={option.value}
            value={option.value}>
            {option.displayValue}
          </option>
          )
        )}
        </select>
                break;
    default:
      inputElement = <input 
        className={classes.InputElement} 
        {...props.elementConfig} 
        value={props.value}/>;
  }
  
  return (<div className={classes.Input}>
    <label htmlFor="" className={classes.Label}>{props.label}</label>
    {inputElement}
  </div>);
};

export default input;