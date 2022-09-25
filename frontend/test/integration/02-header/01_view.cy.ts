describe('Header - View', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
  })

  it('Show the header correctly', () => {
    cy.get('header').should('be.visible')
  })

  it('Shows the name of the currently logged in user', () => {
    cy.get('.headerUserName').should('contain', 'Otter Gentleman')
  })

  it('Does not show the name of the currently logged in user in mobile version', () => {
    cy.viewport('iphone-8')
    cy.get('.headerUserName').should('not.be.visible')
  })

  it('Shows the avatar of the user', () => {
    cy.get('.MuiAvatar-img').should('be.visible')
  })

  it('Shows the logo of the page', () => {
    cy.get('.headerLogo > img').should('be.visible')
  })

  it('Shows the cart icon', () => {
    cy.get('[data-testid="ShoppingCartIcon"] > path').should(
      'be.visible',
    )
  })
})
