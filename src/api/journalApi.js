import axios from "axios"



const journaApi = axios.create({
    baseURL: 'https://vue-demos-a7003-default-rtdb.firebaseio.com'
})


export default journaApi