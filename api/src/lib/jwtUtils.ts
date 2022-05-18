import { Request } from 'express'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { IJwtUserPayload } from '../types'

export const getReqToken = (req: Request) => {
  const { cookies, headers } = req
  if (cookies?.token) {
    return cookies.token
  }
  if (headers?.authorization?.split(' ')?.[0] === 'Bearer') {
    return headers.authorization.split(' ')[1]
  }
  return null
}
export const generateToken = (payload: JwtPayload, secret: string) => sign(payload, secret, { expiresIn: '1d' })
export const decodeToken = (token: string | null, secret: string) => {
  if (token) {
    return verify(token, secret) as IJwtUserPayload
  }
  return null
}
