import React, { Component } from 'react';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elemntType: 'input',
          elementConfig: {
            type: 'text',
            placeHolder: 'Your Name'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeHolder: 'Street'
          },
          value: ''
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeHolder: 'ZIP Code'
          },
          value: ''
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeHolder: 'Country'
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeHolder: 'Your Name'
          },
          value: ''
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: ''
        }
    },
    loading: false
  }

  orderHandler = (evt) => {
    evt.preventDefault();
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      })

  }

  render() {
    let form = (
      <form>
          <Input type="text" inputtype="input" name="name" placeholder="Your name"/> <br/>
          <Input type="text" inputtype="input" name="email" placeholder="Your email"/> <br/>
          <Input type="text" inputtype="input" name="street" placeholder="Street"/> <br/>
          <Input type="text" inputtype="input" name="postalCode" placeholder="Postal Code"/> <br/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if(this.state.loading) {
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

export default ContactData;