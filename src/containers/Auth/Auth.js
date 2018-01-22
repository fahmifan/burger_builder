import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions/index';

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
         minLength: 6
        },
        valid: false,
        touched: false,
        errorMessage: 'is required'
      }
    },
    isSignup: true
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value, 
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = formElementsArray.map(formElement => (
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

    this.props.loading && (form = <Spinner />);

    let errorMessage = null;

    this.props.error && (errorMessage = <p>{this.props.error.message}</p>)

    let authRedirect = null;
    if(this.props.isAuth) {
      authRedirect = <Redirect to="/" />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h1>{this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</h1>
        {errorMessage}
        <form onSubmit={(event) => this.submitHandler(event)}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button 
          btnType="Danger"
          clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actionTypes.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);