import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ErrorMessage } from '../components/ErrorMessage'
import { LandingPageLayout } from '../components/Layout/LandingPageLayout'
import { useApp } from '../contexts/AppContext'

import './LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useApp()
  // WEB: Implement username and password state here
  const [error, setError] = useState('')
  // WEB: Implement handleUsernameChange and handlePasswordChange here
  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()
      try {
        setError('')
        await login(username, password)
        navigate('/feed')
      } catch (err) {
        setError((err as Error).message)
      }
    },
    [login, username, password, navigate],
  )
  return (
    <LandingPageLayout>
      <form className="login-form" onSubmit={handleSubmit}>
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
          data-testid="login-button"
          disabled={username === '' || password === ''}
        >
          Login
        </button>
      </form>
      <p>or</p>
      <Link to="/register">
        <button className="button-outlined" type="button" data-testid="register-button">Register</button>
      </Link>
    </LandingPageLayout>
  )
}

export default LoginPage
