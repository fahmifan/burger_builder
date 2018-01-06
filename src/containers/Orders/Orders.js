import React, { Component } from 'react';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandlers/withErrorHandlers';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(resp => {
        let fetchOrder = [];
        for (let key in resp.data) {
          fetchOrder.push({
            ...resp.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchOrder});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }
  
  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);