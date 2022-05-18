import { gql } from '@apollo/client'
import moment from 'moment'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { useApp } from '../contexts/AppContext'
import { usePage } from '../contexts/PageContext'
import { plural } from '../lib/utils'
import {
  ICreateOneLikeInput, ICreateOneTweetInput, IFilterRemoveOneLikeInput, ITweet,
} from '../types'

import { Avatar } from './Avatar'
import './TweetContent.css'

// WEB: Implement retweet mutation here
const RETWEET_MUTATION = gql`
`
// WEB: Implement like mutation here
const LIKE_MUTATION = gql`
`
// WEB: Implement unlike mutation here
const UNLIKE_MUTATION = gql`
`

export interface ITweetContentProps {
  tweet: ITweet
}
export const TweetContent = ({ tweet }: ITweetContentProps) => {
  const { user } = useApp()
  const { refetch } = usePage()
  // WEB: Implement useMutation for retweetMutation, likeMutation, unlikeMutation here
  const handleRetweet = useCallback(
    async () => {
      const record: ICreateOneTweetInput = {
        retweetId: tweet._id,
      }
      try {
        await retweetMutation({ variables: { record } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [refetch, retweetMutation, tweet._id, tweet.text, tweet.user?.username],
  )
  const handleLike = useCallback(
    async () => {
      const record: ICreateOneLikeInput = {
        tweetId: tweet._id,
      }
      try {
        await likeMutation({ variables: { record } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [likeMutation, refetch, tweet._id],
  )
  const handleUnlike = useCallback(
    async () => {
      const filter: IFilterRemoveOneLikeInput = {
        tweetId: tweet._id,
      }
      try {
        await unlikeMutation({ variables: { filter } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [refetch, tweet._id, unlikeMutation],
  )
  return (
    <div className="tweet-root">
      <Avatar username={tweet.user?.username ?? 'A'} />
      <div className="tweet-content">
        <div className="tweet-info">
          <span className="tweet-fullname">
            <Link to={`/${tweet.user?.username ?? ''}`} data-testid={`tweet-${tweet._id as string}-fullname`}>
              {tweet.user?.fullname ?? 'Fullname'}
            </Link>
          </span>
          <span className="tweet-username">
            <Link to={`/${tweet.user?.username ?? ''}`} data-testid={`tweet-${tweet._id as string}-username`}>
              @{tweet.user?.username ?? 'username'}
            </Link>
          </span>
          <span>·</span>
          <span className="tweet-timestamp" data-testid={`tweet-${tweet._id as string}-timestamp`}>{moment(tweet.createdAt as string).fromNow()}</span>
        </div>
        <div
          className="tweet-text"
          data-testid={`tweet-${tweet._id as string}-text`}
        >
          {tweet.text}
        </div>
        <div className="tweet-actions">
          {tweet.retweeted ? (
            <button
              className="tweet-retweet-button tweet-retweeted"
              type="button"
              onClick={handleRetweet}
              data-testid={`tweet-${tweet._id as string}-retweeted-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id as string}-retweet-count`}>{tweet.retweetsCount ?? 0}</span> {plural(tweet.retweetsCount ?? 0, 'Retweet')}
            </button>
          ) : (
            <button
              className="tweet-retweet-button"
              type="button"
              onClick={handleRetweet}
              data-testid={`tweet-${tweet._id as string}-retweet-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id as string}-retweet-count`}>{tweet.retweetsCount ?? 0}</span> {plural(tweet.retweetsCount ?? 0, 'Retweet')}
            </button>
          )}
          {tweet.liked ? (
            <button
              className="tweet-like-button tweet-liked"
              type="button"
              onClick={handleUnlike}
              data-testid={`tweet-${tweet._id as string}-unlike-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id as string}-like-count`}>{tweet.likesCount ?? 0}</span> {plural(tweet.likesCount ?? 0, 'Like')}
            </button>
          ) : (
            <button
              className="tweet-like-button"
              type="button"
              onClick={handleLike}
              data-testid={`tweet-${tweet._id as string}-like-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id as string}-like-count`}>{tweet.likesCount ?? 0}</span> {plural(tweet.likesCount ?? 0, 'Like')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
