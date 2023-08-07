import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/activeUserReducer'
import { Grid, Button, Stack, Typography } from '@mui/material'

const NavMenu = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()

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
            <Button component={Link} to='/' variant='contained'>
              Blogs
            </Button>
            <Button component={Link} to='/users' variant='contained'>
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
              sx={{ display: { xs: 'none', sm: 'block' } }}
              noWrap
            >
              {activeUser.name} logged in &nbsp;&nbsp;&nbsp;
            </Typography>
            <Button
              type='button'
              onClick={() => dispatch(logoutUser())}
              variant='contained'
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
