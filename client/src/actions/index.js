import axios from 'axios'
import * as types from './types'

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
  document.cookie = 'refresh_token=' + res.data.data.refresh_tokens
  callback()
  window.location.reload()
}
const options = {
  headers: {
    Authorization: 'Bearer ' + getToken().accessToken,
  },
}

// User -

export const fetchUser = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get('/api/user/setting', options)
      .catch(async (error) => {
        await refreshToken(fetchUser)
      })
    if (res) dispatch({ type: types.FETCH_USER, payload: res.data })
  } else dispatch({ type: types.FETCH_USER, payload: false })
}

// Set -

export const fetchSet = (id) => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get(`/api/sets/${id}`, options)
      .catch(async (error) => {
        await refreshToken(fetchSet)
      })
    if (res) dispatch({ type: types.FETCH_SET, payload: res.data })
  } else dispatch({ type: types.FETCH_SET, payload: false })
}

export const createSet = async (set) => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/sets`, set, options)
      .catch(async (error) => {
        await refreshToken(createSet)
      })
    console.log(res)
  }
}
export const editSet = async (id, set, pw = '') => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/sets/${id}`, { args: set, old_password: pw }, options)
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
  }
}

export const deleteSet = async (id) => {
  if (getToken().accessToken) {
    const res = await axios
      .delete(`/api/sets/${id}`, options)
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
  }
}

// User -

/* Sets -- */

export const fetchSetsUser = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios.get('/api/sets', options).catch(async (error) => {
      await refreshToken(fetchSetsUser)
    })
    if (res) dispatch({ type: types.FETCH_SETS_USER, payload: res.data })
  } else dispatch({ type: types.FETCH_SETS_USER, payload: false })
}
