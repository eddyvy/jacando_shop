describe('Home - Functionality', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
  })

  it('Displays a confirm modal when clicking "RESET DATA"', () => {
    cy.get('.homeSection > button').click()

    cy.get('.swal2-popup')
      .should('be.visible')
      .should('contain', 'Are you sure?')

    cy.get('.swal2-confirm').should('contain', 'Yes, reset data')
    cy.get('.swal2-cancel').should('contain', 'Cancel')
  })

  it('Modal cancel button hides the modal', () => {
    cy.get('.homeSection > button').click()
    cy.get('.swal2-cancel').click()

    cy.get('.swal2-popup').should('not.exist')
  })

  it('On confirm, it makes the appropiate call', () => {
    cy.intercept('http://localhost:4000/fixtures').as('getFixtures')

    cy.get('.homeSection > button').click()
    cy.get('.swal2-confirm').click()

    cy.wait(['@getFixtures'])

    cy.get('.swal2-popup')
      .should('be.visible')
      .should('contain', 'Done!')

    cy.get('.swal2-confirm').should('contain', 'OK').click()

    cy.get('.swal2-popup').should('not.exist')
  })
})
