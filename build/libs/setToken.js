"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenData = void 0;
const hitAPIs_1 = require("./hitAPIs");
const configs_1 = require("../configs");
const encodedSecret = configs_1.default.spotify.encodedID_Secret;
const url = 'https://accounts.spotify.com/api/token';
const options = {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedSecret
    },
};
const accessTokenData = () => {
    return new Promise((resolve, reject) => {
        hitAPIs_1.fetchData(url, options)
            .then(data => {
            console.log(data);
            resolve(data);
        })
            .catch(err => {
            console.error(err);
            reject(err);
        });
    });
};
exports.accessTokenData = accessTokenData;
//# sourceMappingURL=setToken.js.map