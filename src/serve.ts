
import 'reflect-metadata'

import * as Express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { Arg, buildSchema, Field, ObjectType, Query, Resolver } from 'type-graphql'


import { SearchResolver } from './resolvers/search'
import { ArtistResolver } from './resolvers/artist'

import compression = require('compression')



@ObjectType()
class Pravas {
    @Field()
    likes: string
}

// import schema from './schema/old'
@Resolver(Pravas)
class HelloResolver {
    @Query(() => [Pravas])
    async hello(
        @Arg('what', { defaultValue: 'Ice cream' })
        what: string
    ): Promise<Pravas[]>{
        return [
            {
                likes: 'Pravas likes ' + what
            }
        ]
    }
}



const main = async () => {

    const schema = await buildSchema({
        resolvers: [
            HelloResolver,
            SearchResolver,
            ArtistResolver
        ]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express(), PORT = 4000

    app.use(compression())
    apolloServer.applyMiddleware({app})
    

    app.listen(PORT, () => {
        console.log(`Listening, go to http://localhost:${ PORT }/graphql`)
    })
    
}

main()



