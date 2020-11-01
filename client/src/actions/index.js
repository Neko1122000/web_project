import axios from 'axios'
import { FETCH_USER } from './types'

// export const fetchUser = () => async (dispatch) => {
//   const res = await axios.get('api/current_user')
//   dispatch({ type: FETCH_USER, payload: res.data })
// }
const getToken = () => {
  return {
    accessToken: document.cookie
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('access_token'))
          .split('=')[1]
      : null,
    refreshToken: document.cookie
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('refresh_token'))
          .split('=')[1]
      : null,
  }
}

export const fetchUser = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get('http://localhost:8080/api/user/setting', {
        headers: {
          Authorization: 'Bearer ' + getToken().accessToken,
        },
      })
      .catch(async (error) => {
        const res = await axios.get('/api/token/refresh', {
          params: { refresh_token: getToken().refreshToken },
        })
        console.log(res.data)
      })
    if (res) dispatch({ type: FETCH_USER, payload: res.data })
  } else dispatch({ type: FETCH_USER, payload: false })
}
