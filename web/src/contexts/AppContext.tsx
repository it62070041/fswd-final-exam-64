import { gql, useLazyQuery, useMutation } from '@apollo/client'
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react'
import { useCookies } from 'react-cookie'

import {
  IMutation, IMutationLoginArgs, IQuery, IUser,
} from '../types'

const ME_QUERY = gql`
query {
  me {
    _id
    username
    fullname
  }
}
`
const LOGIN_MUTATION = gql`
mutation ($username: String! $password: String!) {
  login (username: $username password: $password) {
    message
    token
  }
}
`

export interface IAppContext {
  loading: boolean
  user: IUser | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}
export const AppContext = createContext<IAppContext>({} as IAppContext)

export interface IAppContextProviderProps {
  children: React.ReactNode
}
export const AppProvider = ({ children }: IAppContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [loadMe, { data, loading }] = useLazyQuery<IQuery, object>(ME_QUERY, { fetchPolicy: 'network-only' })
  const [loginMutation] = useMutation<IMutation, IMutationLoginArgs>(LOGIN_MUTATION)
  const login = useCallback(
    async (username: string, password: string) => {
      const { data: loginData } = await loginMutation({ variables: { username, password } })
      if (loginData?.login?.token) {
        setCookie('token', loginData.login.token, { maxAge: 86400, path: '*' })
        await loadMe()
      } else {
        throw new Error(loginData?.login?.message)
      }
    },
    [loadMe, loginMutation, setCookie],
  )
  const logout = useCallback(
    () => {
      removeCookie('token', { maxAge: 86400, path: '*' })
      setUser(null)
    },
    [removeCookie],
  )
  useEffect(
    () => {
      if (data?.me) {
        setUser(data.me ?? null)
      }
    },
    [data],
  )
  useEffect(
    () => {
      const loadData = async () => {
        try {
          await loadMe()
        } catch (err) {
          setUser(null)
          throw err
        }
      }
      if (cookies.token) {
        loadData().catch(console.error)
      }
    },
    [cookies.token, loadMe],
  )
  const value = useMemo(
    () => ({
      loading,
      user,
      login,
      logout,
    }),
    [loading, login, logout, user],
  )
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
export const useApp = () => useContext(AppContext)
