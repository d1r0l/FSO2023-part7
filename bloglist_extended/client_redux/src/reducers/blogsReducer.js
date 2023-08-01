import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { makeNotification } from './notificationReducer'

const initialState = []

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      const updatedBlogs = state.concat(action.payload)
      return updatedBlogs
    },
    replaceBlog: (state, action) => {
      const updatedBlogs = state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )
      return updatedBlogs
    },
    removeBlog: (state, action) => {
      const updatedBlogs = state.filter(blog => blog.id !== action.payload.id)
      return updatedBlogs
    }
  }
})

export const { setBlogs, appendBlog, replaceBlog, removeBlog } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const fetchedBlogs = await blogsService.getAll()
    dispatch(setBlogs(fetchedBlogs))
  }
}

export const createBlog = (newBlog, activeUser) => {
  return async dispatch => {
    try {
      const respondedBlog = await blogsService.createNew(
        newBlog,
        activeUser.token
      )
      const savedBlogWithUser = {
        ...respondedBlog,
        user: {
          name: activeUser?.name,
          username: activeUser?.username,
          id: activeUser?.id
        }
      }
      dispatch(appendBlog(savedBlogWithUser))
      dispatch(
        makeNotification({
          text: `a new blog "${respondedBlog.title}" by "${respondedBlog.author}" added`,
          color: 'green'
        })
      )
    } catch (error) {
      if (error.response.data.error) {
        dispatch(
          makeNotification({ text: error.response.data.error, color: 'red' })
        )
      } else {
        dispatch(makeNotification({ text: 'an error occured', color: 'red' }))
      }
    }
  }
}

export const likeBlog = (selectedBlog, activeUser) => {
  return async dispatch => {
    try {
      const requestBlog = {
        ...selectedBlog,
        likes: selectedBlog.likes + 1,
        user: selectedBlog.user.id
      }
      const respondedBlog = await blogsService.addLike(
        requestBlog,
        activeUser.token
      )
      const updatedBlog = { ...respondedBlog, user: selectedBlog.user }
      dispatch(replaceBlog(updatedBlog))
      dispatch(
        makeNotification({
          text: `a blog "${updatedBlog.title}" by "${updatedBlog.author}" likes updated`,
          color: 'green'
        })
      )
    } catch (error) {
      if (error.response.data.error) {
        dispatch(
          makeNotification({ text: error.response.data.error, color: 'red' })
        )
      } else {
        dispatch(makeNotification({ text: 'an error occured', color: 'red' }))
      }
    }
  }
}

export const deleteBlog = (selectedBlog, activeUser) => {
  return async dispatch => {
    if (
      window.confirm(
        `Remove blog "${selectedBlog.title}" by "${selectedBlog.author}"?`
      )
    ) {
      try {
        await blogsService.deleteBlog(selectedBlog, activeUser.token)
        dispatch(removeBlog(selectedBlog))
        dispatch(
          makeNotification({
            text: `a blog "${selectedBlog.title}" by "${selectedBlog.author}" deleted`,
            color: 'green'
          })
        )
      } catch (error) {
        if (error.response.data.error) {
          dispatch(
            makeNotification({ text: error.response.data.error, color: 'red' })
          )
        } else {
          dispatch(makeNotification({ text: 'an error occured', color: 'red' }))
        }
      }
    }
  }
}

export default blogsSlice.reducer
