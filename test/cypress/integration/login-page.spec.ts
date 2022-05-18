import faker from '@faker-js/faker'

import { username, password } from '../mock/alice.json'

export const LoginPage = () => {
  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login')
    })

    it('Input and state working correctly', () => {
      cy.getByTestID('username-input').type(username).should('have.value', username)
      cy.getByTestID('password-input').type(password).should('have.value', password)
    })
    it('Login button enabled/disabled working correctly', () => {
      cy.getByTestID('login-button').should('be.disabled')

      cy.getByTestID('username-input').type(username)
      cy.getByTestID('login-button').should('be.disabled')

      cy.getByTestID('password-input').type(password)
      cy.getByTestID('login-button').should('not.be.disabled').click()
      cy.url().should('include', '/feed')
    })

    it('Login success redirect to Feed page correctly', () => {
      cy.getByTestID('username-input').type(username)
      cy.getByTestID('password-input').type(password)
      cy.getByTestID('login-button').click()
      cy.url().should('include', '/feed')
    })

    it('Show error message when login failed correctly', () => {
      const fakerUsername = faker.name.firstName()
      cy.getByTestID('username-input').type(fakerUsername)
      cy.getByTestID('password-input').type(password)
      cy.getByTestID('login-button').click()
      cy.getByTestID('error-message').should('be.visible').should('have.text', `Username ${fakerUsername} not found`)

      cy.getByTestID('username-input').clear()
      cy.getByTestID('password-input').clear()

      cy.getByTestID('username-input').type(username)
      cy.getByTestID('password-input').type('1')
      cy.getByTestID('login-button').click()
      cy.getByTestID('error-message').should('be.visible').should('have.text', 'Incorrect password')
    })

    it('Register button redirect to Register page correctly', () => {
      cy.getByTestID('register-button').click()
      cy.url().should('include', '/register')
    })
  })
}

export {}
