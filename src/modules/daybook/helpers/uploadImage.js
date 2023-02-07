import axios from 'axios'


const uploadImage = async ( file ) => {

    if( !file ) return

    try {

        const formData = new FormData()

        formData.append('upload_preset', 'curso_vue_js')
        formData.append('file', file)

        const url = `https://api.cloudinary.com/v1_1/dmjkmiwrz/image/upload`

        const { data } = await axios.post(url, formData)

        return data.secure_url
        
    } catch (error) {
        console.log('Error al cargar la imagen, revisar --logs', error)
        return null
    }

}


export default uploadImage