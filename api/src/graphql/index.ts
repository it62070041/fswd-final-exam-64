import { schemaComposer } from 'graphql-compose'

import * as mutationFields from './mutations'
import * as queryFields from './queries'
import './relations'

schemaComposer.Query.addFields(queryFields)
schemaComposer.Mutation.addFields(mutationFields)

const schema = schemaComposer.buildSchema()

export default schema
