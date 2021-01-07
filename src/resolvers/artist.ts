import { AlbumType } from './../types/album'

import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql"

import { checkForTokenAndHitAPI } from './checkForTokenAndHitAPI'
import { fetchOptions } from './../libs/hitAPIs'
import configs from '../configs'

// import { GetArtist } from './../args/artist'
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




    // FIELD RESOLVERS

    @FieldResolver(() => [AlbumType])
    async albums(@Root() artist: ArtistType) {


        const url = `https://api.spotify.com/v1/artists/${ artist.id }/albums`
        

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
            const { name, id, images, artists, uri, href } = item
            const temp: AlbumType = {
                id, name, images, uri, href,
                artistNames: artists.map((item: { name: string }) => item.name)
            }

            return temp
        })



        

        return refinedData
    }
} 