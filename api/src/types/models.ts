import { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  fullname: string
  username: string
  password: string
  avatar: string
  bio: string
  createdAt: Date
  updatedAt: Date
  getUpdate: () => unknown
  verifyPassword: (password: string) => Promise<boolean>
}
export interface ITweet extends Document {
  userId: Schema.Types.ObjectId
  text: string
  retweetId: Schema.Types.ObjectId | null
  createdAt: Date
  updatedAt: Date
}
export interface IFollower extends Document {
  userId: Schema.Types.ObjectId
  followedId: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
export interface ILike extends Document {
  userId: Schema.Types.ObjectId
  tweetId: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
