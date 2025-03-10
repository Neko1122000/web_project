import { FETCH_FOLDER } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_FOLDER:
      return action.payload
    default: {
      return state
    }
  }
}
