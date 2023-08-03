/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeActiveUser, logoutUser } from './reducers/activeUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'

const App = () => {
  const blogsSelector = state => state.blogs
  const blogs = useSelector(blogsSelector)
  const activeUserSelector = state => state.activeUser
  const activeUser = useSelector(activeUserSelector)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeActiveUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const sortBlogs = blogs => [...blogs].sort((a, b) => b.likes - a.likes)

  const BlogList = () => {
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <br />
        <div>
          {sortBlogs(blogs).map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users />} />
      </>
    )
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {activeUser ? (
        <div>
          <p>
            {activeUser.name} logged in&nbsp;
            <button type='button' onClick={() => dispatch(logoutUser())}>
              logout
            </button>
          </p>
          <RouterProvider router={router} />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
