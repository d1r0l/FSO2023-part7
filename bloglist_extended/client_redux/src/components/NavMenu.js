import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/activeUserReducer'
import { Box, Button, Grid, Typography } from '@mui/material'

const NavMenu = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()

  return (
    <Box>
      <Grid container my={2}>
        <Grid item xs={6} md={1} alignItems='center' justifyContent='center'>
          <Button component={Link} to='/' color='primary' variant='contained'>
            Blogs
          </Button>
        </Grid>
        <Grid item xs={6} md={1} alignItems='center' justifyContent='center'>
          <Button
            component={Link}
            to='/users'
            color='primary'
            variant='contained'
          >
            Users
          </Button>
        </Grid>
        {activeUser ? (
          <>
            <Grid
              item
              xs={6}
              md={9}
              alignItems='center'
              justifyContent='center'
            >
              <Typography variant='caption'>
                {activeUser.name} logged in
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={1}
              alignItems='center'
              justifyContent='flex-end'
            >
              <Button
                type='button'
                onClick={() => dispatch(logoutUser())}
                color='primary'
                variant='contained'
              >
                logout
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Box>
  )
}

export default NavMenu
