import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/activeUserReducer'
import { Grid, Button, Stack, Typography } from '@mui/material'

const NavMenu = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()
  const location = useLocation()
  const pathname = location.pathname

  return (
    <Grid
      container
      sx={{
        mb: 2,
        justifyContent: 'space-between'
      }}
      spacing={1}
    >
      <Grid item>
        <Grid container>
          <Stack direction='row' spacing={1}>
            <Button
              component={Link}
              to='/'
              variant='contained'
              sx={{ width: 90 }}
              {...(pathname === '/' && { disabled: true })}
            >
              Blogs
            </Button>
            <Button
              component={Link}
              to='/users'
              variant='contained'
              sx={{ width: 90 }}
              {...(pathname === '/users' && { disabled: true })}
            >
              Users
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid item>
        {activeUser ? (
          <Stack direction='row' alignItems='center'>
            <Typography
              variant='caption'
              color='primary.main'
              sx={{ display: { xs: 'none', sm: 'block' } }}
              noWrap
            >
              {activeUser.name} logged in &nbsp;&nbsp;&nbsp;
            </Typography>
            <Button
              type='button'
              variant='contained'
              sx={{ width: 90 }}
              onClick={() => dispatch(logoutUser())}
            >
              logout
            </Button>
          </Stack>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default NavMenu
