import '@fontsource/roboto/400.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

let theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9f9f9'
        }
      }
    }
  },
  palette: {
    primary: {
      light: '#48a871',
      main: '#3F9664',
      dark: '#398459',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#f04c97',
      main: '#ee007f',
      dark: '#ed0066',
      contrastText: '#fff'
    }
  }
})
theme = responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)
