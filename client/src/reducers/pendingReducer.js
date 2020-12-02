import { GET_PENDING } from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_PENDING:
            return action.payload
        default: {
            return state
        }
    }
}
