import { combineReducers } from 'redux'
import authReducer from './authReducer'
import setReducer from './setReducer'
import infoReducer from './infoReducer'

export default combineReducers({
  auth: authReducer,
  sets: setReducer,
  info: infoReducer,
})
