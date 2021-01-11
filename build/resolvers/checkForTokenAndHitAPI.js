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
exports.checkForTokenAndHitAPI = void 0;
const configs_1 = require("../configs");
const hitAPIs_1 = require("./../libs/hitAPIs");
const setToken_1 = require("./../libs/setToken");
const checkForTokenAndHitAPI = (url, options) => {
    return new Promise((resolve, reject) => {
        hitAPIs_1.fetchData(url, options)
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (!!data.error) {
                if (!!(data.error.status === 401)) {
                    const newAccessToken = yield setToken_1.accessTokenData();
                    configs_1.default.spotify.setAccessToken(newAccessToken.access_token);
                    const newOptions = Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, options.headers), { 'Authorization': 'Bearer ' + configs_1.default.spotify.getAccessToken() }) });
                    console.log({
                        "new": newAccessToken.access_token
                    });
                    console.log("New Token generated");
                    hitAPIs_1.fetchData(url, newOptions)
                        .then(data => {
                        resolve(data);
                    })
                        .catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }
                else
                    reject(data.error);
            }
            else
                resolve(data);
        }))
            .catch(err => {
            console.log(err);
            reject(err);
        });
    });
};
exports.checkForTokenAndHitAPI = checkForTokenAndHitAPI;
//# sourceMappingURL=checkForTokenAndHitAPI.js.map