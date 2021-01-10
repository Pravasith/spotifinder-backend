

import 'reflect-metadata'

import * as Express from 'express'

import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from 'type-graphql'


import { SearchResolver } from './resolvers/search'
import { ArtistResolver } from './resolvers/artist'
import { AlbumResolver } from './resolvers/album'

import compression = require('compression')







const main = async () => {

    const schema = await buildSchema({
        resolvers: [
            SearchResolver,
            ArtistResolver,
            AlbumResolver
        ]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express(), PORT = process.env.PORT || 4000



    let corsOptions = {
        origin: ['http://localhost:3000', 'https://spotifinder.vercel.app'],
        credentials: true, // <-- REQUIRED backend setting
    }

    
    console.log(process.env.NODE_ENV)

    app.use(compression())
    apolloServer.applyMiddleware({
        app,
        cors: corsOptions
    })


    app.listen(PORT, () => {
        console.log(`Listening in Heroku, go to http://localhost:${ PORT }/graphql`)
    })
    
}

main()



