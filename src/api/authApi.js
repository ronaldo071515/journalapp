import axios from "axios"



const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyD7bAKTjabjslRnXStGeMU1V0aBwLE21cY'
    }
})

// console.log(process.env.NODE_ENV) //TEST durante testing

export default authApi