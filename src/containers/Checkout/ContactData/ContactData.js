import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InputComp from '../../../components/Input/Input';
import wothErrorHandler from '../../../hoc/withErrorHandlers/withErrorHandlers';
import withErrorHandlers from '../../../hoc/withErrorHandlers/withErrorHandlers';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
           required: true
          },
          valid: false,
          touched: false,
          errorMessage: 'is required'
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          errorMessage: 'is required'
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false,
          errorMessage: 'is required, min 5 & max 5'
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true 
          },
          valid: false,
          touched: false,
          errorMessage: 'is required'
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your E-mail'
          },
          value: '',
          validation: {
            required: true 
          },
          valid: false,
          touched: false,
          errorMessage: 'is required'
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          validation: {},
          value: 'fastest',
          valid: true
        }
    },
    loading: false,
    formIsValid: false
  }

  orderHandler = (evt) => {
    evt.preventDefault();
    // this.setState({loading: true})
    const formData = {}
    for(let formElID in this.state.orderForm) {
      formData[formElID] = this.state.orderForm[formElID].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData
    }

    this.props.onOrderBurger(order);
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

    return isValid;
  }

  inputChangeHandler =(event, inputID) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputID]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value, 
      updatedFormElement.validation
    );
    updatedOrderForm[inputID] = updatedFormElement;
    
    let formIsValid = true;
    for(let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }
  
  render() {
    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <InputComp
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value} 
              change={(evt) => this.inputChangeHandler(evt, formElement.id)}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid} 
              errorMessage={formElement.config.errorMessage}
              label={formElement.config.elementConfig.placeholder}/>
          ))}
          <Button 
            btnType="Success" 
            clicked={this.orderHandler} 
            disabled={!this.state.formIsValid} >ORDER</Button>
      </form>
    );
    if(this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandlers(ContactData, axios));