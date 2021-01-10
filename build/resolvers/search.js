"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.SearchResolver = void 0;
const configs_1 = require("../configs");
const search_1 = require("./../types/search");
const type_graphql_1 = require("type-graphql");
const search_2 = require("./../args/search");
const checkForTokenAndHitAPI_1 = require("./checkForTokenAndHitAPI");
let SearchResolver = class SearchResolver {
    search({ searchQuery, searchFilter, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchFilter.join()}&limit=${limit}`;
            const accessToken = configs_1.default.spotify.getAccessToken();
            const options = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            const data = yield checkForTokenAndHitAPI_1.checkForTokenAndHitAPI(url, options);
            const { albums, artists, tracks } = data;
            const refinedData = {
                albums: albums.items.map((item) => {
                    const { name, id, images, artists, uri, href } = item;
                    return {
                        name, id, images, uri, href,
                        artistNames: artists.map((artist) => artist.name),
                    };
                }),
                artists: artists.items.map((item) => {
                    const { id, name, followers, images, popularity, type, uri, href, genres } = item;
                    return { id, name, followers, images, popularity, type, uri, href, genres };
                }),
                tracks: tracks.items.map((item) => {
                    const { preview_url, name, id, artists, album, popularity, type, available_markets, duration_ms, uri, href, } = item;
                    return {
                        preview_url, name, id, popularity, type,
                        available_markets, duration_ms, uri, href,
                        artistNames: artists.map((artist) => artist.name),
                        images: album.images
                    };
                }),
            };
            return refinedData;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => search_1.SearchType),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_2.GetSearchArgs]),
    __metadata("design:returntype", Promise)
], SearchResolver.prototype, "search", null);
SearchResolver = __decorate([
    type_graphql_1.Resolver()
], SearchResolver);
exports.SearchResolver = SearchResolver;
//# sourceMappingURL=search.js.map