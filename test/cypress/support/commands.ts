import 'cypress-file-upload'

export const getByTestID = (selector: string) => cy.get(`[data-testid="${selector}"]`)

export const getByTestIDStartsWith = (selector: string) => cy.get(`[data-testid^="${selector}"]`)

Cypress.Commands.add('getByTestID', getByTestID)

Cypress.Commands.add('getByTestIDStartsWith', getByTestIDStartsWith)

export {}
