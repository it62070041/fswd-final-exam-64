import bcrypt from 'bcrypt'

import { IUser } from '../types/models'

export async function preSaveHook(this: IUser, next: (err?: NativeError) => void) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.set('password', await bcrypt.hash(this.password, salt))
    return next()
  } catch (err) {
    return next(err as NativeError)
  }
}
export async function preUpdateHook(this: IUser, next: (err?: NativeError) => void) {
  const update = this.getUpdate() as { $set?: IUser }
  if (!update?.$set?.password) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.set('password', await bcrypt.hash(update?.$set?.password, salt))
    return next()
  } catch (err) {
    return next(err as NativeError)
  }
}
export async function verifyPassword(this: IUser, password: string) {
  return bcrypt.compare(password, this.password)
}
