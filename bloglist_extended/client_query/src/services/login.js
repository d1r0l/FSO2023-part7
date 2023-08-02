import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async credentials => {
  const request = await axios
    .post(baseUrl, credentials)
    .then(response => response.data)
  return request.data
}

export default loginService
