import axios from "axios";
import fileDownload from "js-file-download";

const api = axios.create({
    baseURL: 'http://localhost:9100/',
    timeout: 60000,
    headers: {
        'X-Custom-Header': 'Hello'
    }
})

// donwload files
export const DownloadFile = (id: string, filename: string) => {
    api.get('/download/someid')
        .then(res => fileDownload(res.data, `${id}-${filename}.html`))
        .catch(err => console.log(err.message))
}

// generate textbook
export const GenerateTexbook = (template_id: string, sheet_id: string) => {
    const headers = {
        // 'Content-Type': 'application/json',
        'Accept': 'application/zip'
    }
    const payload = {
        template_id: template_id, sheet_id: sheet_id
    }

    api.post('/generate', payload, { headers, responseType: 'arraybuffer' })
        .then(res => fileDownload(res.data, 'textbook.zip'))
        .catch(err => console.log(err.message))
}


// templates
// save templates
export const SaveTemplate = (file: unknown, template_name: unknown, template_ducument_url: unknown) => {

    const headers = {
        'Content-Type': 'application/json'
    }
    const payload = {
        file,
        name: template_name,
        url: template_ducument_url
    }

    api.post('/template/register', payload, { headers })
        .then(res => res.data)
        .catch(err => console.error(err.message))
}

// get templates
export const GetTemplates = () => {
    return api.get('/templates')
        .then(res => res.data)
        .catch(err => console.error(err))
}