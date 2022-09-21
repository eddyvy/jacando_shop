describe('Home - View', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check cypress config', () => {
    cy.get('html').should('be.visible')
  })
})
