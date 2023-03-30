import axios from "axios"



const journaApi = axios.create({
    baseURL: 'https://vue-demos-a7003-default-rtdb.firebaseio.com'
})

journaApi.interceptors.request.use( (config) => {

    config.params = {
        auth: localStorage.getItem('idToken')
    }

    return config
})

// console.log(process.env.NODE_ENV) //TEST durante testing

export default journaApi