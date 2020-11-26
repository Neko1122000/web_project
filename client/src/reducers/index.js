import { combineReducers } from 'redux'
import authReducer from './authReducer'
import setReducer from './setsReducer'

export default combineReducers({
  auth: authReducer,
  sets: setReducer,
})
