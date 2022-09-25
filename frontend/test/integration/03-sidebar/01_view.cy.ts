describe('Sidebar - View', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
  })

  it('Shows sidebar correctly', () => {
    cy.get('nav').should('be.visible')
  })

  it('Shows the correct data, including the three categories', () => {
    cy.get('nav')
      .should('contain', 'Home')
      .should('contain', 'Categories')
      .should('contain', 'Vegetables')
      .should('contain', 'Fruits')
      .should('contain', 'Cheese')
  })

  it('Displays the toggle sidebar button on mobile view', () => {
    cy.viewport('iphone-8')
    cy.get('.floatingButton').should('be.visible')
  })
})
