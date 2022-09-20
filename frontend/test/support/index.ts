import { dataCy } from './commands/dataCy'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery>
    }
  }
}

Cypress.Commands.add('dataCy', dataCy)
