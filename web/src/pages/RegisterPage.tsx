import { gql } from '@apollo/client'
import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ErrorMessage } from '../components/ErrorMessage'
import { LandingPageLayout } from '../components/Layout/LandingPageLayout'
import { ICreateOneUserInput } from '../types'

import './RegisterPage.css'

// WEB: Implement register mutation here
const REGISTER_MUTATION = gql`
`

const RegisterPage = () => {
  const navigate = useNavigate()
  // WEB: Implement fullname, username and password state here
  const [error, setError] = useState('')
  // WEB: Implement useMutation for registerMutation here
  // WEB: Implement handleFullnameChange, handleUsernameChange and handlePasswordChange here
  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()
      const record: ICreateOneUserInput = {
        fullname,
        username,
        password,
      }
      try {
        setError('')
        const { data: registerData } = await registerMutation({ variables: { record } })
        if (registerData?.register?.recordId) {
          navigate('/login')
        }
      } catch (err) {
        if ((err as Error).message.startsWith('E11000')) {
          setError(`Duplicate username ${username}`)
        } else {
          setError('Server error')
        }
      }
    },
    [fullname, navigate, password, registerMutation, username],
  )
  return (
    <LandingPageLayout>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="fullname-input">
          Fullname
          <input
            id="fullname-input"
            type="text"
            value={fullname}
            onChange={handleFullnameChange}
            data-testid="fullname-input"
          />
        </label>
        <label htmlFor="username-input">
          Username
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            data-testid="username-input"
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            data-testid="password-input"
          />
        </label>
        <ErrorMessage message={error} />
        <button
          type="submit"
          data-testid="register-button"
          disabled={fullname === '' || username === '' || password === '' || ['login', 'logout', 'register', 'feed'].includes(username)}
        >
          Register
        </button>
      </form>
      <p>or</p>
      <Link to="/login">
        <button className="button-outlined" type="button" data-testid="login-button">Login</button>
      </Link>
    </LandingPageLayout>
  )
}

export default RegisterPage
