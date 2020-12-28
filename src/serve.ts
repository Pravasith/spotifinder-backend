import 'reflect-metadata'

import * as Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { Arg, buildSchema, Field, ObjectType, Query, Resolver } from 'type-graphql'

// import { accessTokenData } from './libs/setToken'
import { SearchResolver } from './resolvers/search'



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
            SearchResolver
        ]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express(), PORT = 4000

    // console.log(await accessTokenData() ) // Do this to get it when token and cookie expire

    apolloServer.applyMiddleware({app})
    

    app.listen(PORT, () => {
        console.log(`Listening, go to http://localhost:${ PORT }/graphql`)
    })
    
}

main()



