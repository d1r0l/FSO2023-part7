import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './components/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActiveUserContextProvider } from './components/ActiveUserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <ActiveUserContextProvider>
        <App />
      </ActiveUserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
