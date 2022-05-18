import { Navigate } from 'react-router-dom'

import { Loading } from '../components/Loading'
import { useApp } from '../contexts/AppContext'

const HomePage = () => {
  const { loading, user } = useApp()
  if (loading) {
    return (
      <Loading />
    )
  }
  if (!user) {
    return (
      <Navigate to="/login" />
    )
  }
  return (
    <Navigate to="/feed" />
  )
}

export default HomePage
