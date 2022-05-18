import { ITweet } from '../../generated/graphql'

export const testTweetContent = (tweet: ITweet) => {
  cy.getByTestID(`tweet-${tweet._id as string}-fullname`).should('have.text', tweet.user?.fullname).should('have.attr', 'href', `/${tweet.user?.username ?? ''}`)
  cy.getByTestID(`tweet-${tweet._id as string}-username`).should('have.text', `@${tweet.user?.username ?? ''}`).should('have.attr', 'href', `/${tweet.user?.username ?? ''}`)
  cy.getByTestID(`tweet-${tweet._id as string}-text`).should('have.text', tweet.text)
  cy.getByTestID(`tweet-${tweet._id as string}-retweet-count`).should('have.text', tweet.retweetsCount?.toString())
  cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
  if (tweet.liked) {
    cy.getByTestID(`tweet-${tweet._id as string}-unlike-button`).should('exist')
  } else {
    cy.getByTestID(`tweet-${tweet._id as string}-like-button`).should('exist')
  }
}

export const testLikeTweet = (tweet: ITweet) => {
  cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
  cy.getByTestID(`tweet-${tweet._id as string}-like-button`).click()
  cy.getByTestID(`tweet-${tweet._id as string}-unlike-button`).should('exist')
  cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', ((tweet.likesCount ?? 0) + 1).toString())
}

export const testUnlikeTweet = (tweet: ITweet) => {
  cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', tweet.likesCount?.toString())
  cy.getByTestID(`tweet-${tweet._id as string}-unlike-button`).click()
  cy.getByTestID(`tweet-${tweet._id as string}-like-button`).should('exist')
  cy.getByTestID(`tweet-${tweet._id as string}-like-count`).should('have.text', ((tweet.likesCount ?? 0) - 1).toString())
}
