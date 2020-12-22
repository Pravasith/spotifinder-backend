"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const node_fetch_1 = require("node-fetch");
const fetchData = (url, options) => {
    const { method } = options;
    if (method === 'get')
        return handleGET(url, options);
    else
        return handlePOST(url, options);
};
exports.fetchData = fetchData;
const handlePOST = (url, options) => {
    return node_fetch_1.default(url, options)
        .then((res) => res.json());
};
const handleGET = (url, options) => {
    return node_fetch_1.default(url, options)
        .then((res) => res.json());
};
//# sourceMappingURL=hitAPIs.js.map