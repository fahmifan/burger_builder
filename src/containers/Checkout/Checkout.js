import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSumamry';
import ContactData from '../Checkout/ContactData//ContactData';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  } 

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />
    if(this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings} 
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler} />
            {purchaseRedirect}
          <Route 
            path={this.props.match.path + '/contact-data/'} 
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);