


import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql"


import { checkForTokenAndHitAPI } from './checkForTokenAndHitAPI'
import { fetchOptions } from './../libs/hitAPIs'

import { TrackType } from './../types/track'
import { AlbumType } from './../types/album'
// import { ArtistType } from './../types/artist'

import configs from '../configs'



@Resolver(() => AlbumType)
export class AlbumResolver {

    // QUERIES AND MUTATIONS 

    @Query(() => AlbumType)
    async getAlbum (
        @Arg("albumId")
        albumId : string
    ) {

        const url = `https://api.spotify.com/v1/albums/${ albumId }`
        

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

        const { name, id, images, artists, uri, href } = data
        const refinedData: AlbumType = {
            id, name, images, uri, href,
            artistNames: artists.map((item: { name: string }) => item.name)
        }


        return refinedData

    }

    @Query(() => [AlbumType])
    async getAlbums (
        @Arg("albumIds", () => [String])
        albumIds : string[]
    ) {

        // console.log(albumIds.join())

        const url = `https://api.spotify.com/v1/albums/?ids=${ albumIds.join() }`
        

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

        const refinedData = data.albums.map((item: any) => {
            const { name, id, images, artists, uri, href } = item
            const temp: AlbumType = {
                id, name, images, uri, href,
                artistNames: artists.map((item: { name: string }) => item.name)
            }

            return temp
        })

        return refinedData

    }



    // FIELD RESOLVERS

    @FieldResolver(() => [TrackType])
    async albumTracks(
        @Root() 
        albumData: AlbumType
    ) {

        const url = `https://api.spotify.com/v1/albums/${ albumData.id }/tracks`


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
            const { preview_url, name, id, images, artists, popularity, type, available_markets, duration_ms, uri, href, album } = item
            const temp: TrackType = { 
                preview_url, name, id, images, popularity, type, available_markets, duration_ms, uri, href, album,
                artistNames: artists.map((item: { name: string }) => item.name)
            }

            return temp
        })

        return refinedData
    }



}