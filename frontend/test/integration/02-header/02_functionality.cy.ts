describe('Header - Functionality', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
  })

  it('Should display the cart modal when clicking the cart icon', () => {
    cy.get('html').should('not.contain', 'Your Shopping Cart')

    cy.get('[data-testid="ShoppingCartIcon"] > path')
      .should('be.visible')
      .click()

    cy.get('html').should('contain', 'Your Shopping Cart')
  })

  it('Should hide the cart modal when clicking outside of it', () => {
    cy.get('html').should('not.contain', 'Your Shopping Cart')

    cy.get('[data-testid="ShoppingCartIcon"] > path')
      .should('be.visible')
      .click()

    cy.get('html').should('contain', 'Your Shopping Cart').click(0, 0)
    cy.get('html').should('not.contain', 'Your Shopping Cart')
  })
})
