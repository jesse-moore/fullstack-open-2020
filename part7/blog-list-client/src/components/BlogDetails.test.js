import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogDetails from './BlogDetails'

describe('<BlogDetails/>', () => {
  let blog, user

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mike Schure',
      url: 'http://url.com',
      likes: 14,
      user: { username: 'hansschultz', name: 'hans schultz' },
    }
    user = { username: 'johnnysmith', name: 'johnny smith' }
  })
  test('when like button is clicked twice, the event handler is called twice', () => {
    const handleClick = jest.fn()
    const component = render(
      <BlogDetails blog={blog} user={user} handleLike={handleClick} />
    )
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
