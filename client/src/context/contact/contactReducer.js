import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
        // returns the contact array that has not id equal to payload id, means filters
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
