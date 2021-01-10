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
exports.AlbumResolver = void 0;
const type_graphql_1 = require("type-graphql");
const checkForTokenAndHitAPI_1 = require("./checkForTokenAndHitAPI");
const track_1 = require("./../types/track");
const album_1 = require("./../types/album");
const configs_1 = require("../configs");
let AlbumResolver = class AlbumResolver {
    getAlbum(albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.spotify.com/v1/albums/${albumId}`;
            const accessToken = configs_1.default.spotify.getAccessToken();
            const options = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            const data = yield checkForTokenAndHitAPI_1.checkForTokenAndHitAPI(url, options);
            const { name, id, images, artists, uri, href, album_type, copyrights, release_date } = data;
            const refinedData = {
                id, name, images, uri, href, album_type, release_date,
                copyrights: !!copyrights
                    ?
                        copyrights[0].text
                    :
                        "None",
                artistNames: artists.map((item) => item.name),
                artists: artists.map((item) => {
                    return {
                        name: item.name,
                        href: item.href,
                        id: item.id,
                        type: item.type,
                        uri: item.uri,
                    };
                })
            };
            return refinedData;
        });
    }
    getAlbums(albumIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.spotify.com/v1/albums/?ids=${albumIds.join()}`;
            const accessToken = configs_1.default.spotify.getAccessToken();
            const options = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            const data = yield checkForTokenAndHitAPI_1.checkForTokenAndHitAPI(url, options);
            const refinedData = data.albums.map((item) => {
                const { name, id, images, artists, uri, href, album_type, copyrights, release_date } = item;
                const temp = {
                    id, name, images, uri, href, album_type, release_date,
                    copyrights: !!copyrights
                        ?
                            copyrights[0].text
                        :
                            "None",
                    artistNames: artists.map((item) => item.name),
                    artists: artists.map((item) => {
                        return {
                            name: item.name,
                            href: item.href,
                            id: item.id,
                            type: item.type,
                            uri: item.uri,
                        };
                    })
                };
                return temp;
            });
            return refinedData;
        });
    }
    albumTracks(albumData) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.spotify.com/v1/albums/${albumData.id}/tracks`;
            const accessToken = configs_1.default.spotify.getAccessToken();
            const options = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            const data = yield checkForTokenAndHitAPI_1.checkForTokenAndHitAPI(url, options);
            const refinedData = data.items.map((item) => {
                const { preview_url, name, id, images, artists, popularity, type, available_markets, duration_ms, uri, href, album } = item;
                const temp = {
                    preview_url, name, id, images, popularity, type, available_markets, duration_ms, uri, href, album,
                    artistNames: artists.map((item) => item.name)
                };
                return temp;
            });
            return refinedData;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => album_1.AlbumType),
    __param(0, type_graphql_1.Arg("albumId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumResolver.prototype, "getAlbum", null);
__decorate([
    type_graphql_1.Query(() => [album_1.AlbumType]),
    __param(0, type_graphql_1.Arg("albumIds", () => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AlbumResolver.prototype, "getAlbums", null);
__decorate([
    type_graphql_1.FieldResolver(() => [track_1.TrackType]),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [album_1.AlbumType]),
    __metadata("design:returntype", Promise)
], AlbumResolver.prototype, "albumTracks", null);
AlbumResolver = __decorate([
    type_graphql_1.Resolver(() => album_1.AlbumType)
], AlbumResolver);
exports.AlbumResolver = AlbumResolver;
//# sourceMappingURL=album.js.map