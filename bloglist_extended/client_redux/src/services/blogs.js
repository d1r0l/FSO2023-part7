import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl).then(response => response.data)
  return request
}

const authConfig = token => {
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

const addLike = async (blog, token) => {
  const request = await axios.put(
    `${baseUrl}/${blog.id}`,
    blog,
    authConfig(token)
  )
  return request.data
}

const deleteBlog = async (blog, token) => {
  await axios.delete(`${baseUrl}/${blog.id}`, authConfig(token))
}

const addComment = async (blog, comment, token) => {
  const request = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    comment,
    authConfig(token)
  )
  return request.data
}

export default { getAll, createNew, addLike, deleteBlog, addComment }
