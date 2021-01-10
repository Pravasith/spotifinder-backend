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
exports.GetSearchArgs = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
var SearchFilters;
(function (SearchFilters) {
    SearchFilters["track"] = "track";
    SearchFilters["artist"] = "artist";
    SearchFilters["album"] = "album";
})(SearchFilters || (SearchFilters = {}));
let GetSearchArgs = class GetSearchArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GetSearchArgs.prototype, "searchQuery", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], GetSearchArgs.prototype, "searchFilter", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    class_validator_1.Min(1),
    class_validator_1.Max(50),
    __metadata("design:type", Number)
], GetSearchArgs.prototype, "limit", void 0);
GetSearchArgs = __decorate([
    type_graphql_1.ArgsType()
], GetSearchArgs);
exports.GetSearchArgs = GetSearchArgs;
//# sourceMappingURL=search.js.map