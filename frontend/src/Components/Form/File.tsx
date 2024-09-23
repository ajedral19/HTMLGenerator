import { useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'

type FileUpload = {
    name: string
    accept?: string
}
export default function FileUpload({ name, accept }: FileUpload) {
    const [file, setFile] = useState<string | undefined>("")
    const preview_init = {
        generated: false,
        src: './images/template-placeholder.png',
        alt: 'title capture from file'
    }
    // const [preview, setPreview] = useState(preview_init)
    const [preview] = useState(preview_init)

    const fileinput = useRef<HTMLInputElement | null>(null)

    const handleOnChange = () => {
        const value = fileinput.current?.value
        setFile(value)

    }

    const triggerFileInput = () => { fileinput.current?.click() }

    return (
        <Fragment>
            <div className="file-field">
                <div className="file-field__thumbnail mb-3">
                    <button className={cn("btn file-upload-button", file ? 'primary' : 'secondary')} onClick={triggerFileInput} type="button">
                        {
                            file ?
                                <p>{file}</p>
                                : "Browse template file"
                        }
                    </button>
                    <figure className="html-preview">
                        <img src={preview.src} alt={preview.alt} />
                        {
                            preview.generated ? null :
                                <figcaption className="caption">preview will be automatically generated</figcaption>
                        }
                    </figure>
                </div>
                <input onChange={handleOnChange} ref={fileinput} type="file" name={name} id={name.split('-').join('_')} accept={accept || "text/html"} aria-hidden="true" />
            </div>
        </Fragment>
    )
}