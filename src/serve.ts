

import 'reflect-metadata'

import * as Express from 'express'
// import * as cors from 'cors'
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from 'type-graphql'


import { SearchResolver } from './resolvers/search'
import { ArtistResolver } from './resolvers/artist'
import { AlbumResolver } from './resolvers/album'

import compression = require('compression')



// const whitelist = ['http://localhost:3000/', 'https://spotifinder-backend1.herokuapp.com/']
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }


let corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true, // <-- REQUIRED backend setting
    // preflightContinue: true,
}
 


const main = async () => {

    const schema = await buildSchema({
        resolvers: [
            // HelloResolver,
            SearchResolver,
            ArtistResolver,
            AlbumResolver
        ]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express(), PORT = process.env.PORT || 4000

    // app.use(cors(corsOptions))
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



