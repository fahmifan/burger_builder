import React, { Component } from 'react';

import Aux from '../Auxiliarys';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandlres = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
   
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        }); 
        return req;
      })
      this.respInterceptors = axios.interceptors.response.use(res => res, error => {
        this.setState({
          error: error 
        })
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.respInterceptors);
    }
  
    errorConfirmHandler = () => {
      this.setState({
        error: null
      })
    }

    render() {
      return (
        <Aux>
          <Modal
            modalClose={this.errorConfirmHandler} 
            show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  } 
}

export default withErrorHandlres;