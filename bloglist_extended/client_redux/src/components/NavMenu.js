import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/activeUserReducer'
import { Grid, Button, Stack, Typography, Box } from '@mui/material'

const NavMenu = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()

  return (
    <Grid container mb={2}>
      <Grid item xs={6} sm={3}>
        <Stack direction='row' spacing={1}>
          <Button component={Link} to='/' variant='contained'>
            Blogs
          </Button>
          <Button component={Link} to='/users' variant='contained'>
            Users
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={6} sm={9}>
        {activeUser ? (
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='flex-end'
          >
            <Box>
              <Typography
                variant='caption'
                sx={{ display: { xs: 'none', sm: 'block' } }}
                noWrap
              >
                {activeUser.name} logged in
              </Typography>
            </Box>
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
