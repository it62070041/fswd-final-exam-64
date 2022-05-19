import { AnyKeys, Schema } from 'mongoose'

import { FollowerModel } from '../models/follower'
import { LikeModel } from '../models/like'
import { TweetModel } from '../models/tweet'
import { UserModel } from '../models/user'
import '../mongoose-connect'
import { ITweet, IUser } from '../types/models'

const USERS: AnyKeys<IUser>[] = [
  {
    fullname: 'Alice',
    username: 'alice',
    password: '1234',
  },
  {
    fullname: 'Bob',
    username: 'bob',
    password: '1234',
  },
  {
    fullname: 'Charlie',
    username: 'charlie',
    password: '1234',
  },
]
const TWEET: AnyKeys<ITweet> = {
  text: 'Hello, World!',
}

const main = async () => {
  await FollowerModel.deleteMany({})
  await LikeModel.deleteMany({})
  await TweetModel.deleteMany({})
  await UserModel.deleteMany({})
  const users = await UserModel.create(USERS)
  const userTweets = users.map((user) => ({ ...TWEET, userId: user._id as Schema.Types.ObjectId }))
  await TweetModel.create(userTweets)
  await FollowerModel.create({ userId: users[0]._id as Schema.Types.ObjectId, followedId: users[2]._id as Schema.Types.ObjectId })
  process.exit(0)
}
main().catch(console.error)