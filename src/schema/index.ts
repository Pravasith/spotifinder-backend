import { fetchOptions, fetchData } from './../libs/hitAPIs';
import configs from '../configs'

const { accessToken } = configs.spotify



const url = 'https://api.spotify.com/v1/search?q=roadhouse%20blues&type=album,track&limit=3'
const options: fetchOptions = {
    method: 'get',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + accessToken
    },
}


export const searchData = <T>(): Promise<T> => {
    return new Promise((resolve, reject) => {
        fetchData(url, options)
        .then(data => resolve(data as Promise<T>))
        .catch(err => {
            console.error(err)
            reject(err)
        })

    })
}

