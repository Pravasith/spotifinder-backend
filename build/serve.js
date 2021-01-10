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
require("reflect-metadata");
const Express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const search_1 = require("./resolvers/search");
const artist_1 = require("./resolvers/artist");
const album_1 = require("./resolvers/album");
const compression = require("compression");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [
            search_1.SearchResolver,
            artist_1.ArtistResolver,
            album_1.AlbumResolver
        ]
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
    const app = Express(), PORT = 4000;
    app.use(compression());
    apolloServer.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`Listening, go to http://localhost:${PORT}/graphql`);
    });
});
main();
//# sourceMappingURL=serve.js.map