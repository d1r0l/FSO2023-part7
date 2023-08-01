import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogsReducer'
import { initializeUser, logoutUser } from './reducers/loggedUserReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const blogsSelector = state => state.blogs
  const blogs = useSelector(blogsSelector)
  const loggedUserSelector = state => state.loggedUser
  const loggedUser = useSelector(loggedUserSelector)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  const sortBlogs = blogs => [...blogs].sort((a, b) => b.likes - a.likes)

  const blogList = () => {
    return (
      <div>
        <p>
          {loggedUser.name} logged in&nbsp;
          <button type='button' onClick={() => dispatch(logoutUser())}>
            logout
          </button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm loggedUser={loggedUser} />
        </Togglable>
        <br />
        <div>
          {sortBlogs(blogs).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={loggedUser}
              handleLikeClick={() => dispatch(likeBlog(blog, loggedUser))}
              handleDeleteClick={() => dispatch(deleteBlog(blog, loggedUser))}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {loggedUser ? blogList() : <LoginForm />}
    </div>
  )
}

export default App
