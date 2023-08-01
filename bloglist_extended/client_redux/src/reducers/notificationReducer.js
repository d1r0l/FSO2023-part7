import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: '', color: 'green' }
let timeoutId = null
const delaySec = 5

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    removeNotification: () => {
      return initialState
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const makeNotification = notification => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch(setNotification(notification))
    timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      delaySec * 1000
    )
  }
}

export default notificationSlice.reducer
