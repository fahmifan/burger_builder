import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
         required: true,
         isEmail: true
        },
        valid: false,
        touched: false,
        errorMessage: 'is required'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
         required: true,
         isEmail: true,
         minLength: 6
        },
        valid: false,
        touched: false,
        errorMessage: 'is required'
      }
    }
  }

  checkValidity = (value, rules) => {
    
    let isValid = true;

    if(!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    }
    this.setState({
      controls: updatedControls
    })
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    const form = formElementsArray.map(formElement => (
      <Input
         key={formElement.id}
         elementType={formElement.config.elementType} 
         elementConfig={formElement.config.elementConfig} 
         value={formElement.config.value} 
         change={(evt) => this.inputChangeHandler(evt, formElement.id)}
         touched={formElement.config.touched}
         shouldValidate={formElement.config.validation} 
         errorMessage={formElement.config.errorMessage}
         invalid={!formElement.config.valid} 
         label={formElement.config.elementConfig.placeholder}
      />
    ))
    return (
      <div className={classes.Auth}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </div>      
    );
  }
}

export default Auth;