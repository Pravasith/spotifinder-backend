import { TrackType } from './../types/track'
import { AlbumType } from './../types/album'

import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql"

import { checkForTokenAndHitAPI } from './checkForTokenAndHitAPI'
import { fetchOptions } from './../libs/hitAPIs'
import configs from '../configs'


import { ArtistType } from './../types/artist'





@Resolver(() => ArtistType)
export class ArtistResolver {


    
    // QUERIES AND MUTATIONS 

    @Query(() => ArtistType)
    async getArtist (
        @Arg("artistId")
        artistId : string
    ) {

        const url = `https://api.spotify.com/v1/artists/${ artistId }`
        

        const accessToken = configs.spotify.getAccessToken()

        const options: fetchOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        const data: any = await checkForTokenAndHitAPI(url, options)
        // console.log(data)

        const { id, name, followers, images, popularity, type, uri, href, genres } = data



        const refinedData: ArtistType = {
            id, name, images, popularity, type, uri, href, genres,
            followers: followers.total
        }

        return refinedData

    }

    @Query(() => [ArtistType])
    async getRelatedArtists (
        @Arg("artistId")
        artistId : string
    ) {

        const url = `https://api.spotify.com/v1/artists/${ artistId }/related-artists`
        

        const accessToken = configs.spotify.getAccessToken()

        const options: fetchOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        const data: any = await checkForTokenAndHitAPI(url, options)
        // console.log(data)


        const refinedData = data.artists.map((item: any) => {
            const { id, name, images, popularity, type, uri, href, genres, followers } = item
            const temp: ArtistType = {
                id, name, images, popularity, type, uri, href, genres,
                followers: followers.total
            }

            return temp
        })

        return refinedData

    }




    // FIELD RESOLVERS

    @FieldResolver(() => [AlbumType])
    async albums(@Root() artist: ArtistType) {


        const url = `https://api.spotify.com/v1/artists/${ artist.id }/albums?offset=0&limit=8`


        const accessToken = configs.spotify.getAccessToken()

        const options: fetchOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        const data: any = await checkForTokenAndHitAPI(url, options)
        // console.log(data)

        const refinedData = data.items.map((item: any) => {
            const { name, id, images, artists, uri, href, album_type, copyrights, release_date } = item

            // console.log(!!copyrights)

            const temp: AlbumType = {
                id, name, images, uri, href, album_type, release_date,
                copyrights: 
                    !!copyrights 
                    ?
                    copyrights[0].text
                    :
                    "None",
                artistNames: artists.map((item: { name: string }) => item.name),
                artists: artists.map((item: any) => {
                    return {
                        name: item.name,
                        href: item.href,
                        id: item.id,
                        type: item.type,
                        uri: item.uri,
                    }
                })
            }

            return temp
        })

        return refinedData
    }


    @FieldResolver(() => [TrackType])
    async popularTracks(
        @Root() 
        artist: ArtistType,

        @Arg('country', { defaultValue: 'US' })
        country: string
    ) {

        const url = `https://api.spotify.com/v1/artists/${ artist.id }/top-tracks?country=${ country }`


        const accessToken = configs.spotify.getAccessToken()

        const options: fetchOptions = {
            method: 'get',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        const data: any = await checkForTokenAndHitAPI(url, options)
        // console.log(data)

        const refinedData = data.tracks.map((item: any) => {
            const { preview_url, name, id, images, artists, popularity, type, available_markets, duration_ms, uri, href, album, } = item
            const temp: TrackType = { 
                preview_url, name, id, images, popularity, type, available_markets, duration_ms, uri, href, album,
                artistNames: artists.map((item: { name: string }) => item.name)
            }

            return temp
        })

        return refinedData
    }
} 