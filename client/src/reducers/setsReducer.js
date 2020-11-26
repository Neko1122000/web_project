import { FETCH_SETS_USER, FETCH_SET } from '../actions/types'

export default (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case FETCH_SET:
      return action.payload
    default:
      return state
  }
}
