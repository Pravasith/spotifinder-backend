"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchData = void 0;
const hitAPIs_1 = require("../libs/hitAPIs");
const configs_1 = require("../configs");
const graphql_1 = require("graphql");
const { accessToken } = configs_1.default.spotify;
const searchData = (url, options) => {
    return new Promise((resolve, reject) => {
        hitAPIs_1.fetchData(url, options)
            .then(data => resolve(data))
            .catch(err => {
            console.error(err);
            reject(err);
        });
    });
};
exports.searchData = searchData;
const ImageType = new graphql_1.GraphQLObjectType({
    name: 'Image',
    fields: {
        height: { type: graphql_1.GraphQLInt },
        width: { type: graphql_1.GraphQLInt },
        url: { type: graphql_1.GraphQLString },
    }
});
const TrackType = new graphql_1.GraphQLObjectType({
    name: 'Track',
    description: 'Gets the track object from spotify api.',
    fields: () => ({
        album: {
            type: new graphql_1.GraphQLObjectType({
                name: 'album',
                fields: {
                    name: { type: graphql_1.GraphQLString },
                    id: { type: graphql_1.GraphQLString },
                    images: { type: new graphql_1.GraphQLList(ImageType) },
                    uri: { type: graphql_1.GraphQLString },
                    href: { type: graphql_1.GraphQLString }
                }
            })
        },
        preview_url: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLID },
        artists: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        popularity: { type: graphql_1.GraphQLInt },
        type: { type: graphql_1.GraphQLString },
        available_markets: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        duration_ms: { type: graphql_1.GraphQLInt },
        uri: { type: graphql_1.GraphQLString },
        href: { type: graphql_1.GraphQLString },
    })
});
const SearchResultType = new graphql_1.GraphQLObjectType({
    name: 'SearchQueryResponse',
    description: "Returns the albums, artists, and tracks that match the user's query in the request",
    fields: () => ({
        tracks: {
            type: new graphql_1.GraphQLList(TrackType),
            resolve: (root) => {
                console.log(root);
                return root;
            }
        },
    })
});
exports.default = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'RootQuery',
        description: '...',
        fields: {
            search_results: {
                type: new graphql_1.GraphQLList(SearchResultType),
                args: {
                    query: {
                        type: graphql_1.GraphQLString
                    }
                },
                resolve: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
                    const url = `https://api.spotify.com/v1/search?q=${args.query}&type=track&limit=2`;
                    const options = {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + accessToken
                        },
                    };
                    const data = yield exports.searchData(url, options);
                    let tracks = data.tracks.items;
                    tracks = tracks.map((item) => {
                        const { album, preview_url, name, id, artists, popularity, type, available_markets, duration_ms, uri, href, } = item;
                        return {
                            album: {
                                name: album.name,
                                id: album.id,
                                images: album.images,
                                uri: album.uri,
                                href: album.href,
                            },
                            preview_url,
                            name,
                            id,
                            artists: artists.map((artist) => artist.name),
                            popularity,
                            type,
                            available_markets,
                            duration_ms,
                            uri,
                            href,
                        };
                    });
                    console.log(tracks);
                    root;
                    return [tracks];
                })
            }
        }
    })
});
//# sourceMappingURL=old.js.map