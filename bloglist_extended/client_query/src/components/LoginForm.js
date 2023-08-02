import { useState } from 'react'
import { useActiveUserSet } from './ActiveUserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const setUser = useActiveUserSet()

  const handleSubmit = event => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    setPassword('')
    setUsername('')
    setUser(credentials)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        username
        <input
          id='input-username'
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password
        <input
          id='input-password'
          type='text'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button id='button-login' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
