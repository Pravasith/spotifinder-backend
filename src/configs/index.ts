import { config } from 'dotenv'
config()

export default {
    spotify: {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        encodedID_Secret: process.env.SPOTIFY_ENCODED_ID_SECRET,
        accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
        setAccessToken(accessToken: string){
            this.accessToken = accessToken
        },
        getAccessToken(){
            return this.accessToken
        }
    }
}

// ff4cf933a12a45a780953348e3d33876:3882dcc6d20a4d2394151bc97e3a4e1f