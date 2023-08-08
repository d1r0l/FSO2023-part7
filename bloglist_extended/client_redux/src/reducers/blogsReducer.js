import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { addBlogToUser, removeBlogFromUser } from './usersReducer'
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
      const blogInfo = {
        title: savedBlogWithUser.title,
        author: savedBlogWithUser.author,
        url: savedBlogWithUser.url,
        id: savedBlogWithUser.id
      }
      dispatch(addBlogToUser({ blogInfo, activeUser }))
      dispatch(
        makeNotification({
          text: `a new blog "${respondedBlog.title}" by "${respondedBlog.author}" added`,
          color: 'green'
        })
      )
      return true
    } catch (error) {
      if (error.response.data.error) {
        dispatch(
          makeNotification({ text: error.response.data.error, color: 'red' })
        )
      } else {
        dispatch(makeNotification({ text: 'an error occured', color: 'red' }))
      }
      return false
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
        dispatch(removeBlogFromUser({ selectedBlog }))
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

export const addComment = (selectedBlog, newComment, activeUser) => {
  return async dispatch => {
    if (!newComment) {
      dispatch(
        makeNotification({ text: 'comment cannot be empty', color: 'red' })
      )
      return false
    }
    try {
      const commentToSend = { comment: newComment }
      const respondedBlog = await blogsService.addComment(
        selectedBlog,
        commentToSend,
        activeUser.token
      )
      const updatedBlog = {
        ...respondedBlog,
        user: selectedBlog.user
      }
      dispatch(replaceBlog(updatedBlog))
      dispatch(
        makeNotification({
          text: `a comment "${newComment}" successfully added`,
          color: 'green'
        })
      )
      return true
    } catch (error) {
      if (error.response.data.error) {
        dispatch(
          makeNotification({ text: error.response.data.error, color: 'red' })
        )
      } else {
        dispatch(makeNotification({ text: 'an error occured', color: 'red' }))
      }
      return false
    }
  }
}

export default blogsSlice.reducer
