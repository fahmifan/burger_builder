import React from 'react';

const input = (props) => {
  switch(props.inputType) {
    case ('input'): 
      inputElement = <input {...props}/>;
      break;
    case ('textarea'):
      inputElemnt = <textarea {...props}/>;
      break;
    default: 
      inputElement = <input {...props}/>;
  }
  
  return (<div>
    <label htmlFor="">{props.label}</label>
    {inputElement}
  </div>);
};

export default;