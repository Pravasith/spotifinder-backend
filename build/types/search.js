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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchType = void 0;
const track_1 = require("./track");
const album_1 = require("./album");
const artist_1 = require("./artist");
const type_graphql_1 = require("type-graphql");
let SearchType = class SearchType {
};
__decorate([
    type_graphql_1.Field(() => [album_1.AlbumType]),
    __metadata("design:type", Array)
], SearchType.prototype, "albums", void 0);
__decorate([
    type_graphql_1.Field(() => [artist_1.ArtistType]),
    __metadata("design:type", Array)
], SearchType.prototype, "artists", void 0);
__decorate([
    type_graphql_1.Field(() => [track_1.TrackType]),
    __metadata("design:type", Array)
], SearchType.prototype, "tracks", void 0);
SearchType = __decorate([
    type_graphql_1.ObjectType()
], SearchType);
exports.SearchType = SearchType;
//# sourceMappingURL=search.js.map