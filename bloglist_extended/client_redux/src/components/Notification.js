import { Alert, Snackbar } from '@mui/material'
import { useSelector } from 'react-redux/es/hooks/useSelector'

let open = true

const Notification = () => {
  const text = useSelector(state => state.notification.text)
  const color = useSelector(state => state.notification.color)

  if (text === '') return null
  else {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={5000}
        >
          <Alert
            severity={color === 'green' ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default Notification
