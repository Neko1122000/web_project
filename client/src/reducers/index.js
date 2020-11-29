import { combineReducers } from 'redux'
import authReducer from './authReducer'
import setReducer from './setReducer'
import folderReducer from './folderReducer'
import infoReducer from './infoReducer'

export default combineReducers({
  auth: authReducer,
  sets: setReducer,
  folder: folderReducer,
  info: infoReducer,
})
