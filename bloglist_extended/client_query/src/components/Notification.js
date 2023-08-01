import PropTypes from 'prop-types'

const Notification = ({ text, color }) => {
  if (text === '') return null
  else {
    return (
      <div
        style={{
          color: color,
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }}
      >
        {text}
      </div>
    )
  }
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Notification
