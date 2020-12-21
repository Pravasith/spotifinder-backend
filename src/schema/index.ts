
import { fetchOptions, fetchData } from './../libs/hitAPIs'
import configs from '../configs'
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

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
        name: {
            type: GraphQLString,
            resolve: json => {
                console.log(json.tracks.items)
                return json.tracks.items.uri
            }
        },
        
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
                resolve: (root, args) => {
                    const url = `https://api.spotify.com/v1/search?q=${ args.name }&type=track&limit=3`
                    const options: fetchOptions = {
                        method: 'get',
                        headers: { 
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + accessToken
                        },
                    }

                    root
                    return searchData(url, options)


                }
            }
        })
    })
})

