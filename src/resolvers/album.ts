


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
        // console.log("TRACK::::::::::" + data.name)

        const { name, id, images, artists, uri, href, album_type, copyrights, release_date } = data
        const refinedData: AlbumType = {
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


        const refinedData = data.albums.map((item: any) => {
            const { name, id, images, artists, uri, href, album_type, copyrights, release_date } = item
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



    // FIELD RESOLVERS

    @FieldResolver(() => [TrackType])
    async albumTracks(
        @Root() 
        albumData: AlbumType
    ) {

        const url = `https://api.spotify.com/v1/albums/${ albumData.id }/tracks?offset=0&limit=10`


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