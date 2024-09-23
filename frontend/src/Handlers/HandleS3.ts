import { s3 } from "./handle.config"

export const S3Put = async (file) => {

    const { name, type } = file

    const headers = {
        'Content-Type': "multipart/form-data",
        'Content-Disposition': "inline;filename=" + name
    }
    const payload = {
        file,
        filename: name,
    }


    s3.put('/upload', payload, { headers })
        .then(response => response.data)
        .catch(err => err)

}