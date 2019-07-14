import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from'axios'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const ContactState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // LOAD USER

  // REGISTER USER
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('api/users', formData, config)
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    }catch (e) {
      dispatch({ type: REGISTER_FAIL, payload: e.response.data.msg })
    }
  }

  // LOGIN USER

  // LOGOUT

  // CLEAR ERRORS
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }


    return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default ContactState
