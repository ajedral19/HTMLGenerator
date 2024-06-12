// import fs from 'fs/promises'
// import Handlebars from 'handlebars';
// import { resolve } from 'path';

// export const testfn = () => {

//     const source = '<div>Hello {{name}}</div>'
//     const template = Handlebars.compile(source)

//     const contents = template({ name: "Jane Doe" })

//     console.log(contents);


//     // fs.writeFile('content.html', contents, (err) => {
//     //     if (err) return console.error(err.message)

//     //     console.log('template saved');

//     // })
// }

export const readFileDataAsBase64 = (file: Blob) => {
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = e => resolve(e.target?.result)
        reader.onerror = err => reject(err)

        reader.readAsDataURL(file)
    })
}