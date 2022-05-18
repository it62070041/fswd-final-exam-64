import { JwtPayload } from 'jsonwebtoken'
import { Schema } from 'mongoose'

// Express
export interface CookiesProps {
  token?: string
}
declare module 'express' {
  interface Request {
    cookies: CookiesProps
  }
}
// Apollo context
export interface IJwtUserPayload extends JwtPayload {
  _id: Schema.Types.ObjectId
}
export interface IApolloContext {
  user: IJwtUserPayload
}
