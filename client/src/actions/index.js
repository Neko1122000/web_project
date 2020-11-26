import axios from 'axios'
import { FETCH_USER } from './types'

export const getToken = () => {
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
export const refreshToken = async (callback) => {
  const res = await axios.get('/api/token/refresh', {
    params: { refresh_token: getToken().refreshToken },
  })
  document.cookie = 'access_token=' + res.data.data.token
  document.cookie = 'refresh_token=' + res.data.data.refresh_tokens
  window.location.reload()
}
export const options = {
  headers: {
    Authorization: 'Bearer ' + getToken().accessToken,
  },
}

export const fetchUser = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get('/api/user/setting', options)
      .catch(async (error) => {
        await refreshToken(fetchUser)
      })
    if (res) dispatch({ type: FETCH_USER, payload: res.data })
  } else dispatch({ type: FETCH_USER, payload: false })
}
