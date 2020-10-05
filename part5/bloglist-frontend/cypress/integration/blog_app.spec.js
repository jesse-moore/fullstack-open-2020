describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('label', 'username').find('input')
    cy.contains('label', 'password').find('input')

    // cy.contains(
    //   'log in to application'
    // )
  })
})
