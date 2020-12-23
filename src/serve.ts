import * as express from 'express'
import { accessTokenData } from './libs/setToken'


import { graphqlHTTP } from 'express-graphql'
import schema from './schema'


const main = async () => {
    const app = express()

    console.log(await accessTokenData() ) // Do this to get it when token and cookie expire


    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(4000, () => {
        console.log('listening... ')
    })
    
}

main()



