describe('Home - View', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('Check cypress config', () => {
    cy.get('html').should('be.visible')
  })
})
