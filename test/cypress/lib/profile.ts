import { IQuery } from '../../generated/graphql'

import { graphql } from './graphql'

interface IProfileQuery {
  username: string
}

export const profileQuery = async (username: string): Promise<IQuery> => {
  const query = `
query ($username: String!) {
  profile (filter: { username: $username }) {
    _id
    fullname
    username
    tweetsCount
    followingCount
    followersCount
    following
    createdAt
  }
  tweets (username: $username) {
    _id
    text
    user {
      _id
      fullname
      username
    }
    retweeted
    retweetsCount
    liked
    likesCount
    createdAt
    retweet {
      _id
      text
      user {
        _id
        fullname
        username
      }
      retweeted
      retweetsCount
      liked
      likesCount
      createdAt
    }
  }
}
`
  const variables = {
    username,
  }
  const data = await graphql<IQuery, IProfileQuery>(query, variables)
  return data
}
