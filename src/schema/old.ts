import { fetchOptions, fetchData } from "../libs/hitAPIs"
import configs from "../configs"
import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "graphql"

const { accessToken } = configs.spotify

export const searchData = <T>(
    url: string,
    options: fetchOptions
): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetchData(url, options)
            .then(data => resolve(data as Promise<T>))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: {
        height: { type: GraphQLInt },
        width: { type: GraphQLInt },
        url: { type: GraphQLString },
    },
})

const TrackType = new GraphQLObjectType({
    name: "Track",
    description: "Gets the track object from spotify api.",
    fields: () => ({
        album: {
            type: new GraphQLObjectType({
                name: "album",
                fields: {
                    name: { type: GraphQLString },
                    id: { type: GraphQLString },
                    images: { type: new GraphQLList(ImageType) },
                    uri: { type: GraphQLString },
                    href: { type: GraphQLString },
                },
            }),
        },
        preview_url: { type: GraphQLString },
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        artists: { type: new GraphQLList(GraphQLString) },

        // Optional
        popularity: { type: GraphQLInt },
        type: { type: GraphQLString },
        available_markets: { type: new GraphQLList(GraphQLString) },
        duration_ms: { type: GraphQLInt },
        uri: { type: GraphQLString },
        href: { type: GraphQLString },
    }),
})

const SearchResultType = new GraphQLObjectType({
    name: "SearchQueryResponse",
    description:
        "Returns the albums, artists, and tracks that match the user's query in the request",

    fields: () => ({
        tracks: {
            type: new GraphQLList(TrackType),
            resolve: (root: any) => {
                return root
            },
        },
        // albums: {
        //     type: new GraphQLList(AlbumType)
        // },
        // artist: {
        //     type: new GraphQLList(ArtistType)
        // }
    }),
})

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQuery",
        description: "...",

        fields: {
            // Search Query results
            search_results: {
                type: new GraphQLList(SearchResultType),
                args: {
                    query: {
                        type: GraphQLString,
                    },
                },
                resolve: async (root, args) => {
                    const url = `https://api.spotify.com/v1/search?q=${args.query}&type=track&limit=2`
                    const options: fetchOptions = {
                        method: "get",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: "Bearer " + accessToken,
                        },
                    }

                    const data: any = await searchData(url, options)

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

                    root
                    return [tracks]
                },
            },
        },
    }),
})
