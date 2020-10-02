import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mike Schure',
      url: 'http://url.com',
      likes: 14,
      user: { username: 'hansschultz', name: 'hans schultz' },
    }
    const user = { username: 'johnnysmith', name: 'johnny smith' }
    component = render(<Blog blog={blog} user={user} />)
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent('Mike Schure')
  })
  test('does not render details', () => {
    expect(component.container).not.toHaveTextContent('http://url.com')
    expect(component.container).not.toHaveTextContent('14')
    expect(component.container).not.toHaveTextContent('johnny smith')
  })
  test('renders details when view button clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    expect(component.container).toHaveTextContent('http://url.com')
    expect(component.container).toHaveTextContent('14')
    expect(component.container).toHaveTextContent('hans schultz')
  })
})
