describe('Sidebar - Functionality', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
  })

  it('Should navigate correctly between categories', () => {
    cy.intercept('http://localhost:4000').as('Post')

    cy.get(
      '.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > .MuiButtonBase-root',
    ).click()
    cy.wait('@Post')
    cy.url().should('include', '/vegetables')

    cy.get(
      '.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > .MuiButtonBase-root',
    ).click()
    cy.wait('@Post')
    cy.url().should('include', '/fruits')

    cy.get(
      '.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3) > .MuiButtonBase-root',
    ).click()
    cy.wait('@Post')
    cy.url().should('include', '/cheese')

    cy.get('[data-testid="HomeIcon"]').click()
    cy.url().should('include', '/')
    cy.get('h1').should('contain', 'Welcome to Jacando Shop!')
  })
})
