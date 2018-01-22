import React, { Component } from 'react';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandlers/withErrorHandlers';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Orders extends Component{
  
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }
  
  render() {
    return (
      this.props.loading ? <Spinner /> : <div>
        {this.props.orders.map(order => { 
          return <Order 
            key={order.id} 
            ingredients={order.ingredients}
            price={+order.price}/>
          }
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    error: state.order.error,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));