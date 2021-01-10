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
exports.AlbumType = void 0;
const artist_1 = require("./artist");
const image_1 = require("./image");
const type_graphql_1 = require("type-graphql");
let AlbumType = class AlbumType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => [image_1.Image]),
    __metadata("design:type", Array)
], AlbumType.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "album_type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "copyrights", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "release_date", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], AlbumType.prototype, "artistNames", void 0);
__decorate([
    type_graphql_1.Field(() => [artist_1.ArtistType]),
    __metadata("design:type", Array)
], AlbumType.prototype, "artists", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "uri", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AlbumType.prototype, "href", void 0);
AlbumType = __decorate([
    type_graphql_1.ObjectType()
], AlbumType);
exports.AlbumType = AlbumType;
//# sourceMappingURL=album.js.map