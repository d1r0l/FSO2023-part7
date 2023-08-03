import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { makeNotification } from './notificationReducer'

const initialState = null

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      return action.payload
    },
    removeActiveUser: () => {
      return initialState
    }
  }
})

export const { setActiveUser, removeActiveUser } = activeUserSlice.actions

export const initializeActiveUser = () => {
  return dispatch => {
    const storedUser = window.localStorage.getItem('loggedBloglistAppUser')
    if (storedUser) {
      const loadedUser = JSON.parse(storedUser)
      dispatch(setActiveUser(loadedUser))
    }
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    const loggedUser = await loginService(credentials)
    if (loggedUser) {
      window.localStorage.setItem(
        'loggedBloglistAppUser',
        JSON.stringify(loggedUser)
      )
      dispatch(setActiveUser(loggedUser))
      dispatch(makeNotification({ text: 'login successful', color: 'green' }))
    } else {
      dispatch(makeNotification({ text: 'wrong credentials', color: 'red' }))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(removeActiveUser())
    window.localStorage.removeItem('loggedBloglistAppUser')
    dispatch(makeNotification({ text: 'logout successful', color: 'green' }))
  }
}

export default activeUserSlice.reducer
