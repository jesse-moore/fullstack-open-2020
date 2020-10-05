import { blogs } from './testData'

describe('Blog app', function () {
  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('label', 'username').find('input')
    cy.contains('label', 'password').find('input')
  })
  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/testing/reset')
      const user = {
        name: 'johnny smith',
        username: 'jsmith',
        password: 'password123',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
    it('succeeds with correct credentials', function () {
      cy.contains('label', 'username').find('input').type('jsmith')
      cy.contains('label', 'password').find('input').type('password123')
      cy.contains('button', 'login').click()
      cy.contains('logged in as johnny smith')
    })
    it('fails with incorrect credentials', function () {
      cy.contains('label', 'username').find('input').type('jsmith')
      cy.contains('label', 'password').find('input').type('wrongpassword123')
      cy.contains('button', 'login').click()
      cy.contains('logged in as johnny smith').should('not.exist')
      cy.contains('Invalid username or password')
        .parent()
        .should('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
  })
  describe('While Logged In', function () {
    const blog = { title: 'Test Post', author: 'Mike Blank', url: '/' }
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/testing/reset')
      const user = {
        name: 'johnny smith',
        username: 'jsmith',
        password: 'password123',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.request('POST', 'http://localhost:3001/api/login/', {
        username: user.username,
        password: user.password,
      }).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.body))
      })
      cy.visit('http://localhost:3000')
    })
    it('A blog can be created', function () {
      cy.contains('button', 'Add Blog').click()
      cy.contains('label', 'title').find('input').type(blog.title)
      cy.contains('label', 'author').find('input').type(blog.author)
      cy.contains('label', 'url').find('input').type(blog.url)
      cy.contains('button', 'Add Blog').click()

      cy.contains('div', blog.title)
      cy.contains('div', blog.author)
    })
    it('A blog can be liked', function () {
      const token = JSON.parse(localStorage.getItem('user')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        auth: { bearer: token },
        body: blog,
      })
      cy.contains('button', 'view').click()
      cy.contains('span', 'Likes').parent().contains('0')

      cy.contains('button', 'like').click()
      cy.contains('span', 'Likes').parent().contains('1')
    })
    it('A blog can be deleted', function () {
      const token = JSON.parse(localStorage.getItem('user')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        auth: { bearer: token },
        body: blog,
      })
      cy.contains('button', 'view').click()
      cy.contains('button', 'remove').click()

      cy.contains('Successfully deleted Test Post')
      cy.contains('h2', 'blogs')
        .parent()
        .contains('div', blog.title)
        .should('not.exist')
      cy.contains('h2', 'blogs')
        .parent()
        .contains('div', blog.author)
        .should('not.exist')
    })
    it('A blog cannot be deleted by other users', function () {
      // Create post with current user
      const token = JSON.parse(localStorage.getItem('user')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        auth: { bearer: token },
        body: blog,
      })

      // Create new user
      const user = {
        name: 'sam johnson',
        username: 'sjohnson',
        password: 'password456',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)

      // Log new user in
      cy.request('POST', 'http://localhost:3001/api/login/', {
        username: user.username,
        password: user.password,
      }).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.body))
      })
      cy.visit('http://localhost:3000')

      // Attempt to delete blog post
      cy.contains('button', 'view').click()
      cy.contains('button', 'remove').should('not.exist')
      cy.contains('h2', 'blogs').parent().contains('div', blog.title)
      cy.contains('h2', 'blogs').parent().contains('div', blog.author)
    })
  })
  describe.only('With initialized Users and Blogs', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/testing/initdb')
      cy.request('POST', 'http://localhost:3001/api/login/', {
        username: 'johnny82',
        password: 'password123',
      }).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.body))
      })
      cy.visit('http://localhost:3000')
    })
    it('orders the blogs decending by likes', function () {
      const blogTitlesSorted = blogs
        .sort((blogA, blogB) => {
          return blogB.likes - blogA.likes
        })
        .map((blog) => blog.title)
      cy.contains('h2', 'blogs')
        .parent()
        .find('div')
        .each((e, i) => {
          expect(e).to.contain(blogTitlesSorted[i])
        })
    })
  })
})
