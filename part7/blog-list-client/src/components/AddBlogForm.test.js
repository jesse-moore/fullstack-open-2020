import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm/>', () => {
  test('form calls the event handler with correct details', () => {
    const addBlog = jest.fn()
    const setShowForm = jest.fn()
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mike Schure',
      url: 'http://url.com',
    }
    const component = render(
      <AddBlogForm addBlog={addBlog} setShowForm={setShowForm} />
    )
    const form = component.container.querySelector('form')
    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    fireEvent.change(authorInput, { target: { value: blog.author } })
    fireEvent.change(urlInput, { target: { value: blog.url } })
    fireEvent.change(titleInput, { target: { value: blog.title } })
    fireEvent.submit(form)
    expect(addBlog.mock.calls[0][0]).toEqual(blog)
  })
})
