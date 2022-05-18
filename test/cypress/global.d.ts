import { getByTestID, getByTestIDStartsWith } from './support/commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestID: typeof getByTestID
      getByTestIDStartsWith: typeof getByTestIDStartsWith
    }
  }
}
