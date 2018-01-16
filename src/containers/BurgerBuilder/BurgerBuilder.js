import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliarys';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandlers/withErrorHandlers'; 
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://react-myburger-19cb8.firebaseio.com/ingredients.json')
    //   .then(resp => {
    //     this.setState({
    //       ingredients: resp.data
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       error: true
    //     })
    //   })
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
    const queryParams = [];
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledinfo = {
      ...this.props.ings
    }
    for(let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0
    }
    let orderSummary = null;

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    let burger = this.state.error ? <p style={{textAlign: 'center'}} >Can't load the burger</p> : <Spinner />
    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            totalPrice={this.state.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientDeduct={this.props.onIngredientRemove}
            disabled={disabledinfo}
            purchasable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (<OrderSummary
        ingredients={this.props.ings}
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

const mapStateToProps =  state => {
  return {  
    ings: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));