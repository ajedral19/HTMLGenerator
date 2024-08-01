import { Fragment } from "react/jsx-runtime"
import Button from "../Button"
import Input from "../Form/Input"

import { SaveTemplate } from "../../Utils/RequestHander"
import { readFileDataAsBase64 } from "../../Utils/FileHandlers"
import FileUpload from "../Form/File"
import { useDispatch } from "react-redux"
import { showModal } from "../../Redux/Slices/modal"



export default function Template() {
    const dispatch = useDispatch()
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            template_file: { files: Blob[] },
            "template-name": { value: string, dataset: string },
            "document-template-url": { value: string, dataset: string }

        }
        const file = target.template_file.files[0]
        const template_name = target['template-name'].value
        const document_template = target['document-template-url'].value



        const base64 = await readFileDataAsBase64(file)

        SaveTemplate(base64, template_name, document_template)

        // clear -> close modal 
        dispatch(showModal({ show: false }))

    }

    return (
        <Fragment>
            <div className="template-modal">
                <form action="" onSubmit={handleSubmit}>
                    <FileUpload name="template-file" />
                    <div className="form pr-2 pl-2 pb-2">
                        <div className="fields">

                            {/* <input type="file" name="template-file" id="template_file" /> */}
                            <Input label="Template Name" name='template-name' id='template_name' />
                            <Input label="Document Template URL" name='document-template-url' id='document_template_url' />
                        </div>
                        <div className="commands">
                            <Button type="submit" text='Submit' id='save_template' variant='primary' />
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}