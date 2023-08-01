import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl).then(response => response.data)
  return request
}

const authConfig = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return config
}

const createNew = async (newBlog, token) => {
  const request = await axios.post(baseUrl, newBlog, authConfig(token))
  return request.data
}

const addLike = async (Blog, token) => {
  const request = await axios.put(`${baseUrl}/${Blog.id}`, Blog, authConfig(token))
  return request.data
}

const deleteBlog = async (Blog, token) => {
  await axios.delete(`${baseUrl}/${Blog.id}`, authConfig(token))
}

export default { getAll, createNew, addLike, deleteBlog }
