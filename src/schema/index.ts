import fetch from "node-fetch"

import configs from '../configs'




const encodedSecret = configs.spotify.encodedID_Secret





const x = fetch('https://accounts.spotify.com/api/token', {
        method: 'post',
        body: 'grant_type=client_credentials',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + encodedSecret
        },
    })
.then(res => res.json())
.then(json => console.log(json))

x

