import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeActiveUser } from './reducers/activeUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import NavMenu from './components/NavMenu'
import { Container, Grid, Typography } from '@mui/material'

const App = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeActiveUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <Grid container spacing={2}>
          {sortedBlogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Grid>
      </div>
    )
  }

  return (
    <Container>
      <BrowserRouter>
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          sx={{ fontWeight: 'bold' }}
        >
          BlogList App
        </Typography>
        {activeUser ? <NavMenu /> : null}
        <Notification />
        {activeUser ? (
          <div>
            <Routes>
              <Route path='/' element={<BlogList />} />
              <Route path='users' element={<Users />} />
              <Route path='users/:userId' element={<UserPage />} />
              <Route path='blogs/:blogId' element={<BlogPage />} />
            </Routes>
          </div>
        ) : (
          <LoginForm />
        )}
      </BrowserRouter>
    </Container>
  )
}

export default App
