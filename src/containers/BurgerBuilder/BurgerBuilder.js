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
import * as actions from '../../store/actions/index';

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
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce( (sum, el) => {
        return sum + el;
      }, 0);
      return sum > 0
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
    this.props.history.push('/checkout')
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
            totalPrice={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientDeduct={this.props.onIngredientRemove}
            disabled={disabledinfo}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (<OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
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
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));