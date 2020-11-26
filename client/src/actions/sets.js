import axios from 'axios'
import { FETCH_SETS_USER, FETCH_SET } from './types'
import { options, refreshToken, getToken } from './index'

export const fetchSetsUser = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios.get('/api/sets', options).catch(async (error) => {
      await refreshToken(fetchSetsUser)
    })
    if (res) dispatch({ type: FETCH_SETS_USER, payload: res.data })
  } else dispatch({ type: FETCH_SETS_USER, payload: false })
}

export const fetchSet = (id) => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get(`/api/sets/${id}`, options)
      .catch(async (error) => {
        await refreshToken(fetchSet)
      })
    if (res) dispatch({ type: FETCH_SET, payload: res.data })
  } else dispatch({ type: FETCH_SET, payload: false })
}
