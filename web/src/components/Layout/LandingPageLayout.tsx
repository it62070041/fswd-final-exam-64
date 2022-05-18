import { memo } from 'react'
import { Navigate } from 'react-router-dom'

import { useApp } from '../../contexts/AppContext'
import { Loading } from '../Loading'

import './LandingPageLayout.css'

export interface ILandingPageLayoutProps {
  children: React.ReactNode
}
export const LandingPageLayout = memo(({ children }: ILandingPageLayoutProps) => {
  const { loading, user } = useApp()
  if (loading) {
    return (
      <Loading />
    )
  }
  if (user) {
    return (
      <Navigate to="/feed" />
    )
  }
  return (
    <div className="landing-page">
      <header>
        <h1>Twitter clone</h1>
        <h6>FsWD final exam</h6>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
})
