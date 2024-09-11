import { Fragment } from "react/jsx-runtime";
import Input from "../Components/Form/Input";
import Button from "../Components/Button";
import { GenerateTexbook, GetSheetCount } from "../Utils/RequestHander";
import { useState } from "react";
import fileDownload from "js-file-download";
import useGetTemplates from "../CustomHooks/useGetTemplates";

type Input = {
    document: string,
    sheet: string
}

export default function Generate() {
    const [caption, setCaption] = useState("Generate")
    const [errMsg, setErrMsg] = useState(false)

    const { templates, isLoading } = useGetTemplates()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            ["template-options"]: { value: string, dataset: { id: string } },
            ["document-id"]: { value: string },
        }
        const { ["template-options"]: to, ["document-id"]: di } = target


        if (to.dataset.id && di.value) {
            setErrMsg(false)
            setCaption("Fetching")
            GenerateTexbook(to.dataset.id, di.value)
                .then(res => {
                    if (res.data) {
                        setCaption("Generate")
                        fileDownload(res.data, `${to.dataset.id}.zip`)
                    }
                })
                .catch(err => console.log(err.message))
        } else {
            setErrMsg(true)
        }
    }

    return <Fragment>
        <div className="generate-wrap">
            <h2 className="title title--3">Generate Textbook</h2>
            <form onSubmit={handleSubmit} className="mt-1 form">
                <div className="form">
                    <div className="fields">
                        <Input label="Choose Template" name='template-options' id='template_options' type="select" options={!isLoading ? templates.rows : []} />
                        <Input label="Document ID" name='document-id' id='document_id' />
                        {/* <input type="range" min={1} max={} /> */}
                        {
                            errMsg && <p>Oopes! Got in to some error</p>
                        }
                    </div>
                    <div className="commands">
                        <Button type="submit" text={caption} id='generate_textbook' variant='primary' />
                        <Button type="reset" text='Clear' id='clear_generate_fields' variant='danger' />
                    </div>
                </div>
            </form>
        </div>
    </Fragment>
}