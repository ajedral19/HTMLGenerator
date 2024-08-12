import axios from "axios"
import fileDownload from "js-file-download"

export const DownloadFile = (id: string, filename: string) => {
    const options = {
        method: 'get',
        url: "/download/someid"
    }

    axios(options).then(res => {
        fileDownload(res.data, `${id}-${filename}.html`)
    }).catch(error => console.error(error.message))
}

export const GenerateTexbook = (template_id: string, sheet_id: string) => {
    const options = {
        method: 'post',
        url: "/generate",
        'Content-Type': 'application/json',
        data: {
            template_id: template_id,
            sheet_id: sheet_id
        }
    }

    axios(options).then(res => res.data).catch(error => console.error(error.message))
}