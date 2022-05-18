import { ApolloQueryResult } from '@apollo/client'
import { createContext, useContext, useMemo } from 'react'

import { IQuery } from '../types'

export interface IPageContext {
  refetch: () => Promise<ApolloQueryResult<IQuery>>
}
export const PageContext = createContext<IPageContext>({} as IPageContext)

export interface IPageContextProviderProps {
  children: React.ReactNode
  refetch: () => Promise<ApolloQueryResult<IQuery>>
}
export const PageProvider = ({ children, refetch }: IPageContextProviderProps) => {
  const value = useMemo(
    () => ({
      refetch,
    }),
    [refetch],
  )
  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}
export const usePage = () => useContext(PageContext)
