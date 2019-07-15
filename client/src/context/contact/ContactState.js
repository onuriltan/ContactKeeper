import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import axios from 'axios'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filteredContacts: null,
    error: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // GET CONTACTS
  const getContacts = () => {
    try {
      setTimeout( async () => {
        const res = await axios.get('/api/contacts')
        dispatch({ type: GET_CONTACTS, payload: res.data })
      }, 1000)
    }catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg })
    }
  }

  // CLEAR CONTACTS
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS })
  }

  // ADD CONTACT
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({ type: ADD_CONTACT, payload: res.data })
    }catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg })
    }
  }

  // DELETE CONTACT
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      dispatch({ type: DELETE_CONTACT, payload: id })
    }catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg })
    }
  }

  // UPDATE CONTACT
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({ type: UPDATE_CONTACT, payload: res.data })
    }catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg })
    }
  }

  // SET CURRENT CONTACT
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT_CONTACT, payload: contact })
  }

  // CLEAR CURRENT CONTACT
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT_CONTACT })
  }

  // FILTER CONTACTS
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filteredContacts: state.filteredContacts,
        error: state.error,
        addContact,
        getContacts,
        clearContacts,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
