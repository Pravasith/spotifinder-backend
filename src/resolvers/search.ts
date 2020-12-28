import configs from '../configs'

import { fetchData, fetchOptions } from './../libs/hitAPIs'

import { SearchType } from './../types/search'
import { Args, ArgsType, Field, Query, Resolver } from "type-graphql"


enum SearchFilters {
    track = 'track',
    artist = 'artist',
    album = 'album'
}

@ArgsType()
class GetSearchArgs {
    @Field()
    searchQuery: string

    @Field(() => [String])
    searchFilter: SearchFilters[]
}



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



@Resolver()
export class SearchResolver {

    @Query(() => [SearchType])
    async search (
        @Args()
        { searchQuery, searchFilter }: GetSearchArgs
    ): Promise<SearchType[]> {

        const { accessToken } = configs.spotify

        console.log(searchFilter)

        const url = `https://api.spotify.com/v1/search?q=${ searchQuery }&type=${ searchFilter.join() }&limit=2`
        const options: fetchOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken
            },
        }

        const data: any = await searchData(url, options)
        
        // console.log(data)

        let tracks = data.tracks.items

        tracks = tracks.map((item: any) => {

            const {
                album,
                preview_url,
                name,
                id,
                artists,
                popularity,
                type,
                available_markets,
                duration_ms,
                uri,
                href,
            } = item

            return {
                album: {
                    // Mandatory
                    name: album.name,
                    id: album.id,
                    images: album.images,

                    // Optional
                    uri: album.uri,
                    href: album.href,
                },
                preview_url,
                name,
                id,
                artists: artists.map((artist: any) => artist.name),
            
                // Optional
                popularity,
                type,
                available_markets,
                duration_ms,
                uri,
                href,
            }
            
        })

        // console.log(tracks)
        return tracks
    }

}