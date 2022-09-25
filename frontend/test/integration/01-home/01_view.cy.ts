describe('Home - View', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
  })

  it('Shows the welcome message', () => {
    cy.get('h1').should('contain', 'Welcome to Jacando Shop!')
  })

  it('A reset button is displayed', () => {
    cy.get('.homeSection > button').should('contain', 'Reset Data')
  })
})
