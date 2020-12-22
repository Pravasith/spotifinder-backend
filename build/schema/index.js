"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchData = void 0;
const hitAPIs_1 = require("./../libs/hitAPIs");
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
const TrackType = new graphql_1.GraphQLObjectType({
    name: 'tracks',
    description: '...',
    fields: () => ({
        name: {
            type: graphql_1.GraphQLString,
            resolve: json => {
                console.log(json.tracks);
                return json.tracks.items.uri;
            }
        },
    })
});
exports.default = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'query',
        description: '...',
        fields: () => ({
            tracks: {
                type: TrackType,
                args: {
                    name: {
                        type: graphql_1.GraphQLString
                    }
                },
                resolve: (root, args) => {
                    const url = `https://api.spotify.com/v1/search?q=${args.name}&type=track&limit=3`;
                    const options = {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + accessToken
                        },
                    };
                    root;
                    return exports.searchData(url, options);
                }
            }
        })
    })
});
//# sourceMappingURL=index.js.map