import {
  SET_ALERT,
  REMOTE_ALERT
} from '../types'

export default (state, action)=> {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]
    case REMOTE_ALERT:
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state
  }
}
