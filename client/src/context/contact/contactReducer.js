import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  FILTER_CONTACTS,
  CLEAR_FILTER, CLEAR_CONTACTS
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error:  null,
        current: null
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      }
    case DELETE_CONTACT:
      return {
        ...state,
        // returns the contact array that has not id equal to payload id, means filters
        contacts: state.contacts.filter(contact => contact._id !== action.payload),
        loading: false
      }
    case SET_CURRENT_CONTACT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        current: null
      }
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts: state.contacts.filter(contact => {
          // match with payload with gi(case sensitive)
          const regex = new RegExp(`${action.payload}`, 'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null
      }
    default:
      return state
  }
}
