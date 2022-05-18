import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { useApp } from '../../contexts/AppContext'
import { Loading } from '../Loading'

import './AppPageLayout.css'

export interface IAppPageLayoutProps {
  children: React.ReactNode
}
export const AppPageLayout = memo(({ children }: IAppPageLayoutProps) => {
  const { loading, user } = useApp()
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <div className="app-page">
      <header>
        <h1>Twitter clone</h1>
        {user ? (
          <ul>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/feed" data-testid="feed-link">Feed</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={`/${user?.username ?? ''}`} data-testid="profile-link">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/logout" data-testid="logout-link">Logout</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login" data-testid="login-link">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" data-testid="register-link">Register</NavLink>
            </li>
          </ul>
        )}
      </header>
      <main>
        {children}
      </main>
    </div>
  )
})
