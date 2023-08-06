import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={showWhenVisible}>{props.children}</div>
      <Box my={2}>
        <Button onClick={toggleVisibility} variant='outlined'>
          {visible ? 'cancel' : props.buttonLabel}
        </Button>
      </Box>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
