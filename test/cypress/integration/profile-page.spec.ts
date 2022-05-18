import { login } from '../lib/login'
import { profileQuery } from '../lib/profile'
import { testTweetContent } from '../lib/tweet'
import { username as alice } from '../mock/alice.json'
import { username as bob } from '../mock/bob.json'

export const ProfilePage = () => {
  describe('Profile Page', () => {
    let globalToken: string
    before(async () => {
      globalToken = await login()
    })
    beforeEach(() => {
      cy.setCookie('token', globalToken)
      cy.visit(`/${alice}`)
    })

    it('Profile info display correctly', async () => {
      const { profile } = await profileQuery(alice)
      cy.getByTestID('tweet-count').should('have.text', profile?.tweetsCount?.toString())
      cy.get('div[class="profile-avatar"]').find(`a[href="/${profile?.username ?? ''}"]`).should('be.visible')
      cy.getByTestID('profile-fullname').should('have.text', profile?.fullname)
      cy.getByTestID('profile-username').should('have.text', `@${profile?.username ?? ''}`)
      cy.getByTestID('profile-following-count').should('have.text', profile?.followingCount?.toString())
      cy.getByTestID('profile-followers-count').should('have.text', profile?.followersCount?.toString())
    })
    it('Follow/Unfollow success display correctly', async () => {
      cy.visit(`/${bob}`)
      const { profile } = await profileQuery(bob)
      cy.getByTestID('profile-followers-count').should('have.text', profile?.followersCount?.toString())
      cy.getByTestID('profile-follow-button').should('have.text', 'Follow').click()
      cy.getByTestID('profile-unfollow-button').should('have.text', 'Unfollow')
      cy.getByTestID('profile-followers-count').should('have.text', ((profile?.followersCount ?? 0) + 1).toString())
      cy.getByTestID('profile-unfollow-button').should('have.text', 'Unfollow').click()
      cy.getByTestID('profile-follow-button').should('have.text', 'Follow')
      cy.getByTestID('profile-followers-count').should('have.text', profile?.followersCount?.toString())
      cy.getByTestID('profile-follow-button').click()
    })
    it('User tweets display correctly', async () => {
      const { tweets } = await profileQuery(alice)
      cy.getByTestID('tweets').children().should('have.length', tweets.length)
    })
    it('Tweet content, user info and actions display correctly', async () => {
      const { tweets } = await profileQuery(alice)
      tweets?.forEach((tweet) => {
        if (tweet.retweet) {
          testTweetContent(tweet.retweet)
          cy.getByTestID(`tweet-${tweet.retweet._id as string}-retweeted-button`).should('exist')
        } else {
          testTweetContent(tweet)
          cy.getByTestID(`tweet-${tweet._id as string}-retweet-button`).should('exist')
        }
      })
    })
    // it('Retweet success display new tweet correctly', async () => {
    //   const { tweets } = await profileQuery(username)
    //   const [tweet] = tweets
    //   cy.getByTestID(`tweet-${tweet._id as string}-retweet-button`).click()
    //   cy.getByTestID('tweets').children().should('have.length', tweets.length + 1)
    //   const { tweets: newTweets } = await profileQuery(username)
    //   const [retweet] = newTweets
    //   cy.getByTestID(`tweet-${retweet._id as string}-retweet`).should('have.text', `${tweet.user?.fullname ?? ''} Retweeted`)
    //   cy.getByTestID(`tweet-${retweet._id as string}`).within(() => {
    //     cy.getByTestID(`tweet-${tweet._id as string}-fullname`).should('have.text', tweet.user?.fullname).should('have.attr', 'href', `/${tweet.user?.username ?? ''}`)
    //     cy.getByTestID(`tweet-${tweet._id as string}-username`).should('have.text', `@${tweet.user?.username ?? ''}`).should('have.attr', 'href', `/${tweet.user?.username ?? ''}`)
    //     cy.getByTestID(`tweet-${tweet._id as string}-text`).should('have.text', tweet.text)
    //     cy.getByTestID(`tweet-${tweet._id as string}-retweet-count`).should('have.text', ((tweet.retweetsCount ?? 0) + 1).toString())
    //     cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
    //     cy.getByTestID(`tweet-${tweet._id as string}-retweeted-button`).should('exist')
    //   })
    // })
    it('Like success display tweets correctly', async () => {
      const { tweets } = await profileQuery(alice)
      const [tweet] = tweets
      cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
      cy.getByTestID(`tweet-${tweet._id as string}-like-button`).click()
      cy.getByTestID(`tweet-${tweet._id as string}-unlike-button`).should('exist')
      cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', ((tweet.likesCount ?? 0) + 1).toString())
    })
    it('Unlike success display tweets correctly', async () => {
      const { tweets } = await profileQuery(alice)
      const [tweet] = tweets
      cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
      cy.getByTestID(`tweet-${tweet._id as string}-unlike-button`).click()
      cy.getByTestID(`tweet-${tweet._id as string}-like-button`).should('exist')
      cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', ((tweet.likesCount ?? 0) - 1).toString())
    })
  })
}

export {}
