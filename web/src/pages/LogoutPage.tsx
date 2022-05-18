import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useApp } from '../contexts/AppContext'

const LogoutPage = () => {
  const { logout } = useApp()
  const navigate = useNavigate()
  useEffect(
    () => {
      logout()
      navigate('/login')
    },
    [logout, navigate],
  )
  return null
}

export default LogoutPage
