import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogsReducer'
import { Typography, Link, Button, Box, Grid, Stack } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const BlogPage = () => {
  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const activeUser = useSelector(state => state.activeUser)
  const { blogId } = useParams()
  const blog = blogs.find(blog => blog.id === blogId)

  const dispatch = useDispatch()

  if (!blog) return null

  const handleClick = async event => {
    event.preventDefault()
    const dispatchSuccessful = await dispatch(
      addComment(blog, comment, activeUser)
    )
    if (dispatchSuccessful) setComment('')
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm>
          <Typography
            style={{ display: 'inline-block' }}
            component='h2'
            variant='h3'
            sx={{ fontWeight: 'bold' }}
          >
            {blog.title}&nbsp;
          </Typography>
          <div style={{ display: 'inline-block' }}>
            <Typography
              style={{ display: 'inline-block' }}
              component='h2'
              variant='h3'
              color='text.secondary'
              sx={{ fontWeight: 'bold' }}
            >
              by&nbsp;
            </Typography>
            <Typography
              style={{ display: 'inline-block' }}
              component='h2'
              variant='h3'
              sx={{ fontWeight: 'bold' }}
              gutterBottom
            >
              {blog.author}
            </Typography>
          </div>
          <Link href={blog.url}>
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                wordBreak: 'break-all'
              }}
            >
              {blog.url}
            </Typography>
          </Link>
          <Typography
            style={{ display: 'inline-block' }}
            variant='body1'
            color='text.secondary'
            gutterBottom
          >
            added by:&nbsp;
          </Typography>
          <Link component={RouterLink} to={`/users/${blog.user.id}`}>
            {blog.user.name}
          </Link>
        </Grid>
        <Grid item xs={12} sm='auto'>
          <Stack
            height='100%'
            display='flex'
            justifyContent='space-evenly'
            flexDirection={{
              xs: 'row',
              sm: 'column'
            }}
          >
            <Button
              variant='outlined'
              sx={{
                alignSelf: 'end',
                width: { xs: 180, sm: 90 },
                height: { sm: 73 }
              }}
              onClick={() => dispatch(likeBlog(blog, activeUser))}
              startIcon={<FavoriteIcon />}
            >
              {blog.likes}
            </Button>
            {blog.user.id === activeUser.id && (
              <Button
                variant='outlined'
                sx={{ alignSelf: 'end', width: 90 }}
                onClick={() => dispatch(deleteBlog(blog, activeUser))}
              >
                delete
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant='h5 ' sx={{ fontWeight: 'bold' }}>
          Comments:
        </Typography>
        <form>
          <input
            id='input-comment'
            type='text'
            name='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit' onClick={handleClick}>
            add comment
          </button>
        </form>
        {blog.comments.length === 0 ? (
          <p>no comments</p>
        ) : (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </Box>
    </div>
  )
}

export default BlogPage
