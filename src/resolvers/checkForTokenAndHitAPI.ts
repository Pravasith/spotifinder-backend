import configs from "../configs";

import { fetchData, fetchOptions } from "./../libs/hitAPIs";
import { accessTokenData } from "./../libs/setToken";

export const checkForTokenAndHitAPI = <T>(
    url: string,
    options: fetchOptions
): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetchData(url, options)
            .then(async data => {
                type DATA = {
                    error: { status: number };
                };

                if (!!(<DATA>data).error) {
                    if (!!((data as DATA).error.status === 401)) {
                        // Checking if data threw a 401 error, unauthorised. Probably access token expired
                        const newAccessToken: { access_token: string } =
                            await accessTokenData(); // gets new access token

                        // If so, set a new access token to configs and request data again
                        configs.spotify.setAccessToken(
                            newAccessToken.access_token
                        );

                        const newOptions = {
                            ...options,
                            headers: {
                                ...options.headers,
                                Authorization:
                                    "Bearer " +
                                    configs.spotify.getAccessToken(),
                            },
                        };

                        console.log("New Token generated"); // Intentional

                        // HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!!
                        // HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!!

                        fetchData(url, newOptions)
                            .then(data => {
                                resolve(<T>data);
                            })
                            .catch(error => {
                                console.log(error);
                                reject(error);
                            });

                        // HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!!
                        // HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!! HIGHLY DANGEROUS AREA!!!
                    }

                    // else reject({ error: data, details : "Some error occured. But it's not 401: Unauthorised. Good luck figuring out." })
                    else reject((<DATA>data).error);
                } else resolve(<T>data); // Could also be written as -> resolve(data as T)
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};
