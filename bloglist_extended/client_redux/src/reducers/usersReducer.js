/* eslint-disable indent */
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
    },
    addBlogToUser: (state, action) => {
      const blogInfo = action.payload.blogInfo
      const activeUser = action.payload.activeUser
      const updatedUsers = state.map(user =>
        user.id !== activeUser.id
          ? user
          : {
              ...user,
              blogs: user.blogs.concat(blogInfo)
            }
      )
      return updatedUsers
    },
    removeBlogFromUser: (state, action) => {
      const selectedBlog = action.payload.selectedBlog
      const selectedUser = state.find(user => user.id === selectedBlog.user.id)
      const updatedUserBlogs = selectedUser.blogs.filter(
        blog => blog.id !== selectedBlog.id
      )
      const updatedUser = {
        ...selectedUser,
        blogs: updatedUserBlogs
      }
      const updatedUsers = state.map(user =>
        user.id !== selectedUser.id ? user : updatedUser
      )
      return updatedUsers
    }
  }
})

export const {
  setUsers,
  appendUser,
  replaceUser,
  removeUser,
  addBlogToUser,
  removeBlogFromUser
} = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const fetchedUsers = await usersService.getAll()
    dispatch(setUsers(fetchedUsers))
  }
}

export default usersSlice.reducer
