import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('calls the received event handler with the right details when a blog is created', async () => {
    const handleCreateBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(
      <BlogForm handleCreateBlog={handleCreateBlog} />
    )
    const titleInput = container.querySelector('input[name="title"]')
    const authorInput = container.querySelector('input[name="author"]')
    const urlInput = container.querySelector('input[name="url"]')
    const sendButton = screen.getByText('create')

    const blog = {
      title: 'A testing title',
      author: 'Smart Tester',
      url: 'testing.url'
    }

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(sendButton)

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0]).toEqual(blog)
  })
})
