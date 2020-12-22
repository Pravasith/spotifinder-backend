
import { fetchOptions, fetchData } from './../libs/hitAPIs'
import configs from '../configs'
import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

const { accessToken } = configs.spotify






export const searchData = <T>(url: string, options: fetchOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetchData(url, options)
        .then(data => resolve(data as Promise<T>))
        .catch(err => {
            console.error(err)
            reject(err)
        })
    })
}



const TrackType = new GraphQLObjectType({
    name: 'tracks',
    description: '...',

    fields: () => ({
        name: { type: GraphQLString },
        popularity: { type: GraphQLInt },
        preview_url: { type: GraphQLString },
        duration_ms: { type: GraphQLInt },
        id: { type: GraphQLID }
    })
})


export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        description: '...',

        fields: () => ({
            tracks: {
                type: TrackType,
                args: {
                    name: {
                        type: GraphQLString
                    }
                },
                resolve: async (root, args) => {
                    const url = `https://api.spotify.com/v1/search?q=${ args.name }&type=track,artist&limit=3`
                    const options: fetchOptions = {
                        method: 'get',
                        headers: { 
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + accessToken
                        },
                    }

                    const data: any = await searchData(url, options)

                    // let { items } = data.tracks
                    console.log(data)
                    // let {}
                    root
                    return data.tracks.items[0]

                }
            }
        })
    })
})

