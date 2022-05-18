import { createServer } from 'http'

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'

import schema from './graphql'
import { decodeToken, getReqToken } from './lib/jwtUtils'
import './mongoose-connect'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))

const startApolloServer = async () => {
  const httpServer = createServer(app)
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req }) => {
      const token = getReqToken(req)
      const user = decodeToken(token, process.env.JWT_SECRET ?? '')
      return { user }
    },
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: { origin: ['http://localhost:3000'], credentials: true },
  })
  httpServer.listen({ port: process.env.PORT })
}
startApolloServer().catch(console.error)
