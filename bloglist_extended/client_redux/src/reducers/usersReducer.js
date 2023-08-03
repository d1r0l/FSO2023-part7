import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
// import { makeNotification } from './notificationReducer'

const initialState = []

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
    appendUser: (state, action) => {
      const updatedUsers = state.concat(action.payload)
      return updatedUsers
    },
    replaceUser: (state, action) => {
      const updatedUsers = state.map(user =>
        user.id === action.payload.id ? action.payload : user
      )
      return updatedUsers
    },
    removeUser: (state, action) => {
      const updatedUsers = state.filter(user => user.id !== action.payload.id)
      return updatedUsers
    }
  }
})

export const { setUsers, appendUser, replaceUser, removeUser } =
  usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const fetchedUsers = await usersService.getAll()
    dispatch(setUsers(fetchedUsers))
  }
}

export default usersSlice.reducer
