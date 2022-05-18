import faker from '@faker-js/faker'

import { username, password } from '../mock/alice.json'

export const RegisterPage = () => {
  describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
    const fakerRegister = {
      fullname: faker.name.findName(),
      username: faker.name.firstName(),
      password: faker.internet.password(),
    }
    const register = {
      fullname: faker.name.findName(),
      username: faker.name.firstName(),
      password: faker.internet.password(),
    }

    it('Input and state working correctly', () => {
      cy.getByTestID('fullname-input').type(fakerRegister.fullname).should('have.value', fakerRegister.fullname)
      cy.getByTestID('username-input').type(fakerRegister.username).should('have.value', fakerRegister.username)
      cy.getByTestID('password-input').type(fakerRegister.password).should('have.value', fakerRegister.password)
    })
    it('Register button enabled/disabled working correctly', () => {
      cy.getByTestID('register-button').should('be.disabled')

      cy.getByTestID('fullname-input').type(fakerRegister.fullname)
      cy.getByTestID('register-button').should('be.disabled')

      cy.getByTestID('username-input').type(fakerRegister.username)
      cy.getByTestID('register-button').should('be.disabled')

      cy.getByTestID('password-input').type(fakerRegister.password)
      cy.getByTestID('register-button').should('not.be.disabled').click()
      cy.url().should('include', '/register')
    })
    it('Register success redirect to Login page correctly', () => {
      cy.getByTestID('fullname-input').type(register.fullname)
      cy.getByTestID('username-input').type(register.username)
      cy.getByTestID('password-input').type(register.password)
      cy.getByTestID('register-button').click()
      cy.location('pathname').should('eq', '/login')
    })
    it('Show error message when register failed correctly', () => {
      cy.getByTestID('fullname-input').type(fakerRegister.fullname)
      cy.getByTestID('username-input').type(username)
      cy.getByTestID('password-input').type(password)
      cy.getByTestID('register-button').click()
      cy.getByTestID('error-message').should('be.visible').should('have.text', `Duplicate username ${username}`)
    })
    it('Login button redirect to Login page correctly', () => {
      cy.getByTestID('login-button').click()
      cy.url().should('include', '/login')
    })
  })
}

export {}
