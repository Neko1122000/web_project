import axios from 'axios'
import { FETCH_USER } from './types'

// export const fetchUser = () => async (dispatch) => {
//   const res = await axios.get('api/current_user')
//   dispatch({ type: FETCH_USER, payload: res.data })
// }
const getToken = () => {
  return {
    accessToken: document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token'))
      .split('=')[1],
    refreshToken: document.cookie
      .split('; ')
      .find((row) => row.startsWith('refresh_token'))
      .split('=')[1],
  }
}

export const fetchUser = () => async (dispatch) => {
  console.log(getToken().accessToken)
  const res = await axios.get('http://localhost:8080/api/user/setting')
  console.log(res.data)
  return { type: FETCH_USER, payload: false }
}
