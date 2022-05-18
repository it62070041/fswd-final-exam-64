import faker from '@faker-js/faker'

import { feedQuery } from '../lib/feed'
import { login } from '../lib/login'
import { testTweetContent, testUnlikeTweet, testLikeTweet } from '../lib/tweet'

export const FeedPage = () => {
  describe('Feed Page', () => {
    let globalToken: string
    before(async () => {
      globalToken = await login()
    })
    beforeEach(() => {
      cy.visit('/feed')
      cy.setCookie('token', globalToken)
    })

    it('New tweet input, state and text length working correctly', () => {
      const text = faker.random.words(25)
      cy.getByTestID('new-tweet-input').focus().type('Hello World').should('have.value', 'Hello World')
      cy.getByTestID('new-tweet-input').focus().clear()

      cy.getByTestID('new-tweet-input').focus().type(text)

      cy.getByTestID('new-tweet-input').should('have.text', `${text.substring(0, 140)}`)
    })
    it('Tweet button enabled/disabled working correctly', () => {
      cy.getByTestID('new-tweet-input').should('have.value', '')
      cy.getByTestID('new-tweet-button').should('be.disabled')

      const word = faker.random.word()
      cy.getByTestID('new-tweet-input').focus().type(word)
      cy.getByTestID('new-tweet-button').should('be.visible')
    })
    it('Tweet success display new tweet correctly', async () => {
      const word = faker.random.word()
      cy.getByTestID('new-tweet-input').focus().type(word)
      cy.getByTestID('new-tweet-button').click()
      const [tweet] = await feedQuery()
      testTweetContent(tweet)
    })
    it('User tweets display correctly', async () => {
      const tweets = await feedQuery()
      cy.getByTestID('tweets').children().should('have.length', tweets.length)
    })
    it('Tweet content, user info and actions display correctly', async () => {
      const tweets = await feedQuery()
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
    it('Retweet success display new tweet correctly', async () => {
      const tweets = await feedQuery()
      const [tweet] = tweets
      cy.getByTestID(`tweet-${tweet._id as string}-retweet-button`).click()
      cy.getByTestID('tweets').children().should('have.length', tweets.length + 1)
      const newTweets = await feedQuery()
      const [retweet] = newTweets
      cy.getByTestID(`tweet-${retweet._id as string}-retweet`).should('have.text', `${tweet.user?.fullname ?? ''} Retweeted`)
      cy.getByTestID(`tweet-${retweet._id as string}`).within(() => {
        cy.getByTestID(`tweet-${tweet._id as string}-fullname`).should('have.text', tweet.user?.fullname).should('have.attr', 'href', `/${tweet.user?.username ?? ''}`)
        cy.getByTestID(`tweet-${tweet._id as string}-username`).should('have.text', `@${tweet.user?.username ?? ''}`).should('have.attr', 'href', `/${tweet.user?.username ?? ''}`)
        cy.getByTestID(`tweet-${tweet._id as string}-text`).should('have.text', tweet.text)
        cy.getByTestID(`tweet-${tweet._id as string}-retweet-count`).should('have.text', ((tweet.retweetsCount ?? 0) + 1).toString())
        cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
        cy.getByTestID(`tweet-${tweet._id as string}-retweeted-button`).should('exist')
      })
    })
    it('Like success display tweets correctly', async () => {
      const tweets = await feedQuery()
      const [tweet] = tweets
      if (tweet.retweet) {
        testLikeTweet(tweet.retweet)
      } else {
        testLikeTweet(tweet)
      }
    })
    it('Unlike success display tweets correctly', async () => {
      const tweets = await feedQuery()
      const [tweet] = tweets
      if (tweet.retweet) {
        testUnlikeTweet(tweet.retweet)
      } else {
        testUnlikeTweet(tweet)
      }
    })
  })
}

export {}
