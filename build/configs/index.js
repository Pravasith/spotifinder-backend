"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    spotify: {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        encodedID_Secret: process.env.SPOTIFY_ENCODED_ID_SECRET,
        accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
        setAccessToken(accessToken) {
            this.accessToken = accessToken;
        },
        getAccessToken() {
            return this.accessToken;
        }
    }
};
//# sourceMappingURL=index.js.map