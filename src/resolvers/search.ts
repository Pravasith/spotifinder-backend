
import configs from '../configs'

import { fetchData, fetchOptions } from './../libs/hitAPIs'
import { accessTokenData } from './../libs/setToken'

import { SearchType } from './../types/search'
import { Args, Query, Resolver } from "type-graphql"
import { GetSearchArgs } from './../args/search'






export const searchData = <T>(url: string, options: fetchOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetchData(url, options)
        .then(async data => {
            if(!!((data as T & { error: Object }).error)){
                // Checking if data threw an error, usually access Token expiry
                const newAccessToken: { access_token: string } = await accessTokenData() // gets new access token

                // If so, set a new access token to configs and request data again
                configs.spotify.setAccessToken(newAccessToken.access_token)
                

                const newOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': 'Bearer ' + configs.spotify.getAccessToken()
                    }
                }

                // console.log({
                //     "new": newAccessToken.access_token
                // })

                console.log("New Token generated")

                searchData(url, newOptions)
                .then((data) => { resolve(<T>data) })
                .catch(e => {
                    console.log(e)
                    reject({ error: true, details : e })
                })
            }

            else resolve(<T>data) // Could also be written as -> resolve(data as T)
        })
        .catch(err => {
            console.log(err)
            reject({ error: true, details : err })
        })
    })
}



@Resolver()
export class SearchResolver {

    @Query(() => SearchType)
    async search (
        @Args() { searchQuery, searchFilter }: GetSearchArgs
    ): Promise<SearchType> {

        const accessToken = configs.spotify.getAccessToken()

        // console.log(searchFilter)

        const url = `https://api.spotify.com/v1/search?q=${ searchQuery }&type=${ searchFilter.join() }&limit=2`
        const options: fetchOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        const data: any = await searchData(url, options)
        const { albums, artists, tracks } = data // Spotify data structure


        const refinedData = {
            albums: albums.items.map((item: any) => {
                const { name, id, images, artists, uri, href } = item
                return {
                    name, id, images, uri, href,
                    artistNames: artists.map((artist: { name: string }) => artist.name), 
                }
            }),

            artists: artists.items.map((item: any) => {
                const { id, name, followers, images, popularity, type, uri, href, genres } = item
                return { id, name, followers, images, popularity, type, uri, href, genres }
            }),

            tracks: tracks.items.map((item: any) => {
                const { 
                    preview_url, name, id, artists, album, popularity,
                    type, available_markets, duration_ms, uri, href,
                } = item

                return {
                    preview_url, name, id, popularity, type, 
                    available_markets, duration_ms, uri, href,
                    artistNames: artists.map((artist: { name: string }) => artist.name),
                    images: album.images
                }
            }),
        }

        return refinedData
    }

}