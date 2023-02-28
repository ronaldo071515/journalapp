import axios from 'axios'
import 'setimmediate'
import cloudinary from 'cloudinary'

import uploadImage from "@/modules/daybook/helpers/uploadImage"

cloudinary.config({
    cloud_name: 'dmjkmiwrz',
    api_key: '455856853359732',
    api_secret: 'koF9oJQUUBliiyg3iLpPKFR0-uM'
})


describe('Pruebas en el uploadImage', () => {

    test('debe de cargar un archivo y retornar el URL', async () => {

        const { data } = await axios.get(`https://res.cloudinary.com/dmjkmiwrz/image/upload/v1629308277/zrnflge29vn1bies5xod.jpg`, {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect(typeof url).toBe( 'string' )

        //Tomar el id
        const segments = url.split('/')
        const imageId = segments[ segments.length -1 ].replace('.jpg', '')
        // console.log(imageId)
        await cloudinary.v2.api.delete_resources( imageId )

    })

})