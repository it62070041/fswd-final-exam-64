import { gql } from '@apollo/client'
import moment from 'moment'
import { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import stc from 'string-to-color'

import { Avatar, AvatarSize } from '../components/Avatar'
import { AppPageLayout } from '../components/Layout/AppPageLayout'
import { Loading } from '../components/Loading'
import { Tweet } from '../components/Tweet'
import { useApp } from '../contexts/AppContext'
import { PageProvider } from '../contexts/PageContext'
import { plural } from '../lib/utils'
import {
  ICreateOneFollowerInput, IFilterRemoveOneFollowerInput,
} from '../types'

import './ProfilePage.css'

const PROFILE_QUERY = gql`
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
// WEB: Implement follow mutation here
const FOLLOW_MUTATION = gql`
`
// WEB: Implement unfollow mutation here
const UNFOLLOW_MUTATION = gql`
`

const ProfilePage = () => {
  const { user } = useApp()
  const { username } = useParams()
  // WEB: Implement useQuery for profile query (destruct { data, loading, refetch } from useQuery) with options fetchPolicy: 'network-only' here
  // WEB: Implement useMutation for followMutation and unfollowMutation here
  const handleFollow = useCallback(
    async () => {
      const record: ICreateOneFollowerInput = {
        followedId: data?.profile?._id,
      }
      try {
        await followMutation({ variables: { record } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [data?.profile?._id, followMutation, refetch],
  )
  const handleUnfollow = useCallback(
    async () => {
      const filter: IFilterRemoveOneFollowerInput = {
        followedId: data?.profile?._id,
      }
      try {
        await unfollowMutation({ variables: { filter } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [data?.profile?._id, refetch, unfollowMutation],
  )
  const renderButton = useMemo(
    () => {
      if (!user || user?._id === data?.profile?._id) {
        return null
      }
      if (data?.profile?.following) {
        return (
          <button
            className="profile-unfollow-button button-outlined"
            type="button"
            onClick={handleUnfollow}
            data-testid="profile-unfollow-button"
          >
            Unfollow
          </button>
        )
      }
      return (
        <button
          className="profile-follow-button button-outlined"
          type="button"
          onClick={handleFollow}
          data-testid="profile-follow-button"
        >
          Follow
        </button>
      )
    },
    [data?.profile?._id, data?.profile?.following, handleFollow, handleUnfollow, user],
  )
  return (
    <PageProvider refetch={refetch}>
      <AppPageLayout>
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2 className="profile-title">
              {data?.profile?.fullname ?? 'Fullname'}
            </h2>
            <div className="profile-tweet-count"><span data-testid="tweet-count">{data?.profile?.tweetsCount ?? 0}</span> {plural((data?.profile?.tweetsCount ?? 0), 'Tweet')}</div>
            <div className="profile-root">
              <div className="profile-cover" style={{ backgroundColor: stc(data?.profile?._id as string) }} />
              <div className="profile-avatar">
                <Avatar username={data?.profile?.username ?? ''} size={AvatarSize.LARGE} />
                <div className="profile-actions">
                  {renderButton}
                </div>
              </div>
              <div className="profile-info">
                <h3 className="profile-fullname hilight" data-testid="profile-fullname">{data?.profile?.fullname}</h3>
                <div className="profile-username" data-testid="profile-username">@{data?.profile?.username}</div>
                <div className="profile-timestamp" data-testid="profile-timestamp">Joined {moment(data?.profile?.createdAt as string).format('MMMM YYYY')}</div>
                <div className="profile-stat">
                  <div className="profile-following-count"><span className="hilight" data-testid="profile-following-count">{data?.profile?.followingCount}</span> Following</div>
                  <div className="profile-followers-count"><span className="hilight" data-testid="profile-followers-count">{data?.profile?.followersCount}</span> Followers</div>
                </div>
              </div>
            </div>
            <div className="profile-tweets" data-testid="tweets">
              {data?.tweets?.map((tweet) => (
                <Tweet key={tweet._id as string} tweet={tweet} />
              ))}
            </div>
          </>
        )}
      </AppPageLayout>
    </PageProvider>
  )
}

export default ProfilePage
