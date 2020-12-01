import {
  FETCH_SETS_USER,
  FETCH_FOLDERS_USER,
  FETCH_CLASSES,
} from '../actions/types'

export default (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case FETCH_SETS_USER:
      return action.payload
    case FETCH_FOLDERS_USER:
      return action.payload
    case FETCH_CLASSES:
      return action.payload
    default:
      return state
  }
}
