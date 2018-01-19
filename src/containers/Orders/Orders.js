import React, { Component } from 'react';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandlers/withErrorHandlers';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Orders extends Component{
  
  componentDidMount() {
    this.props.onFetchOrder();
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
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrder()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));