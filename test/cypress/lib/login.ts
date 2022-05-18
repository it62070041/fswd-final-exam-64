import { IMutation, IMutationLoginArgs } from '../../generated/graphql'
import { username, password } from '../mock/alice.json'

import { graphql } from './graphql'

export const login = async (): Promise<string> => {
  const query = `
      mutation ($username: String! $password: String!) {
        login (username: $username password: $password) {
          token
        }
      }
    `
  const variables: IMutationLoginArgs = {
    username,
    password,
  }
  const data = await graphql<IMutation, IMutationLoginArgs>(query, variables)
  return data.login?.token as string
}
