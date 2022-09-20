import Chainable = Cypress.Chainable

export function dataCy(value: string): Chainable<JQuery> {
  return cy.get(`[data-cy=${value}]`)
}
