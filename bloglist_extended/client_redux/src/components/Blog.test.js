import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  let container

  beforeEach(() => {
    const blog = {
      title: 'A testing title',
      author: 'Smart Tester',
      url: 'testing.url',
      likes: 5,
      user: {
        username: 'tester',
        name: 'Tester',
        id: '649c5a3dbde108c86dfdc722'
      }
    }
    const user = {
      username: 'tester',
      name: 'Tester',
      id: '649c5a3dbde108c86dfdc722'
    }

    container = render(
      <Blog
        blog={blog}
        user={user}
        handleLikeClick={handleLike}
        handleDeleteClick={handleDelete}
      />
    ).container
  })

  test('renders blog author & title but not url & likes by default', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    screen.getByText('A testing title', { exact: false })
    screen.getByText('Smart Tester', { exact: false })
  })

  test('renders url & likes after clicking view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.getByText('testing.url', { exact: false })
    screen.getByText('likes', { exact: false })
  })

  test('if likes are clicked twice the event handler called two times', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
