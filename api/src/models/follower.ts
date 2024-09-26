import { model, Schema } from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'

import { IFollower } from '../types/models'

const FollowerSchema = new Schema<IFollower>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    followedId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
)

export const FollowerModel = model<IFollower>('Follower', FollowerSchema)

// API: Implement FollowerTC here
export const FollowerTC = composeMongoose(FollowerModel)