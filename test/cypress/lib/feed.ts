import { IQuery, ITweet } from '../../generated/graphql'

import { graphql } from './graphql'

export const feedQuery = async (): Promise<ITweet[]> => {
  const query = `
query {
  feed {
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
  const data = await graphql<IQuery>(query)
  return data.feed
}
