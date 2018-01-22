import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCsiOl-aJogaeBXJe2OkW8EskcOhr9olVU';
    isSignup && (url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCsiOl-aJogaeBXJe2OkW8EskcOhr9olVU');
    axios.post(url, authData)
      .then(res => {
        console.log(res.data);
        const experationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', experationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error))
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  } 
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const currDate = new Date();
      if(expirationDate <= currDate) {
        dispatch(logout());        
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        const timeOut = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeout(timeOut));
      }
    }
  }
}