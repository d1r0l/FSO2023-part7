import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Link,
  Grid,
  CardActions
} from '@mui/material'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()

  const toggleVisibility = event => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = event => {
    event.preventDefault()
    dispatch(likeBlog(blog, activeUser))
  }

  const handleDelete = event => {
    event.preventDefault()
    dispatch(deleteBlog(blog, activeUser))
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant='h5' noWrap>
            <Link component={RouterLink} to={`/blogs/${blog.id}`} variant='h5'>
              {blog.title}
            </Link>
          </Typography>
          <Typography variant='body1' noWrap>
            by {blog.author}
          </Typography>
          <div style={showWhenVisible}>
            <Typography variant='body1'>likes: {blog.likes}</Typography>
            <Typography variant='body1' noWrap>
              <Link href={blog.url} variant='body1'>
                {blog.url}
              </Link>
            </Typography>
            <Typography variant='body1' noWrap>
              submitted by{' '}
              <Link component={RouterLink} to={`/users/${blog.user.id}`}>
                {blog.user.name}
              </Link>
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            type='button'
            onClick={toggleVisibility}
            color='primary'
            variant='contained'
            size='small'
          >
            {visible ? 'less info' : 'more info'}
          </Button>
          <Button
            style={showWhenVisible}
            type='button'
            onClick={handleLike}
            color='primary'
            variant='outlined'
            size='small'
          >
            like
          </Button>
          {blog.user.id === activeUser.id && (
            <Button
              style={showWhenVisible}
              type='button'
              onClick={handleDelete}
              onMouseDown={event => event.stopPropagation()}
              color='primary'
              variant='outlined'
              size='small'
            >
              delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
