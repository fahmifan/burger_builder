import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    })
  })

  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    }, 
    {
      type: actionTypes.AUTH_SUCCESS,
      token: 'some token',
      userId: 'some uid',
    })).toEqual({
      token: 'some token',
      userId: 'some uid',
      loading: false,
      error: null,
      authRedirectPath: '/'
    })
  })
})

