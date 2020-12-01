import { FETCH_CLASS } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CLASS:
      return action.payload
    default: {
      return state
    }
  }
}
