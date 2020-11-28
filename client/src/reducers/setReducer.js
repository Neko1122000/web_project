import { FETCH_SET } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SET:
      return action.payload
    default: {
      return state
    }
  }
}
