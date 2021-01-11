import { fetchData, fetchOptions } from './hitAPIs'
import configs from '../configs'

const encodedSecret = configs.spotify.encodedID_Secret



const url = 'https://accounts.spotify.com/api/token'
const options: fetchOptions = {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedSecret
    },
}



export const accessTokenData = <T>(): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetchData(url, options)
        .then(data => {

            // console.log(data)
            resolve(data as Promise<T>)
        })
        .catch(err => {
            console.error(err)
            reject(err)
        })

    })
}