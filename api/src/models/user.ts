import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

import { preSaveHook, preUpdateHook, verifyPassword } from '../lib/passwordUtils'
import { IUser } from '../types/models'

const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
  },
  { timestamps: true },
)
UserSchema.pre('save', preSaveHook)
UserSchema.pre('updateOne', preUpdateHook)
UserSchema.method('verifyPassword', verifyPassword)

export const UserModel = model<IUser>('User', UserSchema)

export const UserTC = composeMongoose(UserModel).removeField('password')
