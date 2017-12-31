import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliarys';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  chesse: 0.4,
  bacon: 1.3,
  meat: 0.8
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      chesse: 0,
      meat: 0
    },
    totalPrice: 4
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
  }

  render() {
    const disabledinfo = {
      ...this.state.ingredients
    }
    for(let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientDeduct={this.removeIngredientHandler}
          disabled={disabledinfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;