import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliarys';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandlers/withErrorHandlers'; 

const INGREDIENT_PRICES = {
  salad: 0.5,
  chesse: 0.4,
  bacon: 1.3,
  meat: 0.8
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-myburger-19cb8.firebaseio.com/ingredients.json')
      .then(resp => {
        this.setState({
          ingredients: resp.data
        })
      })
      .catch(error => {
        this.setState({
          error: true
        })
      })
  }

  /**
   * update wether the burger purchasable or not. It become true when the ingredients are > 0
   */
  updatePurchasable = (ingredients) => {
    ingredients = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce( (sum, el) => {
        return sum + el;
      }, 0);
    console.log("sum ingredients", ingredients);
    this.setState({
      purchaseable: ingredients > 0 ? true:false
    });
  }

  /**
   * Adding number of this.state.ingredients of a type
   * 
   * @param {string} type
   */
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngreditens = {...this.state.ingredients};    
    updatedIngreditens[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngreditens,
      totalPrice: newPrice
    });

    this.updatePurchasable(updatedIngreditens);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngreditens = {...this.state.ingredients};    
    updatedIngreditens[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngreditens,
      totalPrice: newPrice
    });

    this.updatePurchasable(updatedIngreditens);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert('You continue');
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'fahmi irfan',
        address: {
          street: 'Test street 1',
          zipCode: '51152',
          country: 'Indonesia'
        }
      },
      email: 'test@email.com',
      deliveryMethod: 'fatest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({
          loading: false, purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false, purchasing: false
        });
      })
  }

  render() {
    const disabledinfo = {
      ...this.state.ingredients
    }
    for(let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0
    }
    let orderSummary = null;

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    let burger = this.state.error ? <p style={{textAlign: 'center'}} >Can't load the burger</p> : <Spinner />
    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            totalPrice={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientDeduct={this.removeIngredientHandler}
            disabled={disabledinfo}
            purchasable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (<OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />);
    }
    if(this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}      
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);