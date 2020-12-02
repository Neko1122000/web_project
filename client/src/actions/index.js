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
  document.cookie = 'refresh_token=' + res.data.data.refresh_token
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

// Folder

export const fetchFolder = (id) => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get(`/api/folder/${id}`, options)
      .catch(async (error) => {
        await refreshToken(fetchFolder)
      })
    if (res) {
      console.log(res)
      dispatch({ type: types.FETCH_FOLDER, payload: res.data })
    }
  } else dispatch({ type: types.FETCH_FOLDER, payload: false })
}

export const createFolder = async (folder) => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/folder`, folder, options)
      .catch(async (error) => {
        await refreshToken(createFolder)
      })
    console.log(res)
  }
}
export const editFolderInfo = async (id, folder) => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/folder/${id}`, folder, options)
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
  }
}
export const editFolderSets = async (id, sets) => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/folder/${id}/sets`, sets, options)
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
  }
}

export const deleteFolder = async (id) => {
  if (getToken().accessToken) {
    const res = await axios
      .delete(`/api/folder/${id}`, options)
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
  }
}

// Class
export const fetchClass = (id) => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get(`/api/class/${id}`, options)
      .catch(async (error) => {
        await refreshToken(fetchClass)
      })
    if (res) {
      console.log(res)
      dispatch({ type: types.FETCH_CLASS, payload: res.data })
    }
  } else dispatch({ type: types.FETCH_CLASS, payload: false })
}

export const createClass = async (classInfo) => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/class`, classInfo, options)
      .catch(async (error) => {
        await refreshToken(createClass)
      })
    console.log(res)
  }
}
export const editClass = async (id, classInfo) => {
  if (getToken().accessToken) {
    const res = await axios
      .post(`/api/class/${id}`, classInfo, options)
      .catch((error) => {
        console.log(error)
      })
    console.log(res)
  }
}
export const deleteClass = async (id) => {
  if (getToken().accessToken) {
    const res = await axios
      .delete(`/api/class/${id}`, options)
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
export const fetchFoldersUser = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios.get('/api/folder', options).catch(async (error) => {
      await refreshToken(fetchFoldersUser)
    })
    if (res) dispatch({ type: types.FETCH_FOLDERS_USER, payload: res.data })
  } else dispatch({ type: types.FETCH_FOLDERS_USER, payload: false })
}
export const fetchClasses = () => async (dispatch) => {
  if (getToken().accessToken) {
    const res = await axios
      .get('/api/classes', {...options, params: {name: 123}})
      .catch(async (error) => {
        await refreshToken(fetchClasses)
      })
    if (res) dispatch({ type: types.FETCH_CLASSES, payload: res.data })
  } else dispatch({ type: types.FETCH_CLASSES, payload: false })
}
