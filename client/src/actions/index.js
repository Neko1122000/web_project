import axios from 'axios'
import { FETCH_USER } from './types'

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
const refreshToken = async (callback) => {
  const res = await axios.get('/api/token/refresh', {
    params: { refresh_token: getToken().refreshToken },
  })
  document.cookie = 'access_token=' + res.data.data.token
  document.cookie = 'refresh_token=' + res.data.data.refresh_token
  callback()
  window.location.reload()
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
        await refreshToken(fetchUser)
      })
    if (res) dispatch({ type: FETCH_USER, payload: res.data })
  } else dispatch({ type: FETCH_USER, payload: false })
}
