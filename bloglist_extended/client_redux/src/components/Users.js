import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Typography
        component='h2'
        variant='h3'
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Users
      </Typography>
      <Grid container>
        {users.map(user => (
          <Grid key={user.id} item xs={12} pb={1}>
            <Card>
              <CardActionArea component={RouterLink} to={`/users/${user.id}`}>
                <CardContent sx={{ flex: 1 }}>
                  <Grid
                    container
                    sx={{
                      flexWrap: 'wrap',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: {
                        sm: 'space-between'
                      }
                    }}
                  >
                    <Grid item>
                      <Typography variant='h5'>{user.name}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        display='inline'
                        variant='h5'
                        color='text.secondary'
                        noWrap
                      >
                        added blogs: &nbsp;
                      </Typography>
                      <Typography display='inline' variant='h5' noWrap>
                        {user.blogs.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Users
