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
  describe.only('While Logged In', function () {
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
    it.only('A blog can be liked', function () {
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
  })
})
