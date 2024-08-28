import { Fragment } from "react/jsx-runtime";
import Input from "../Components/Form/Input";
import DownloadStrip from "../Components/DownloadStip";
import Button from "../Components/Button";

// import { DownloadFile, GenerateTexbook } from "../Utils/Generator";
import { GenerateTexbook, GetTemplates } from "../Utils/RequestHander";

// import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fileDownload from "js-file-download";
// import { useSelector } from "react-redux";

type Input = {
    document: string,
    sheet: string
}

export default function Generate() {
    const [templates, setTemplates] = useState([])
    const [caption, setCaption] = useState("Generate")
    const [err, setErr] = useState(false)

    useEffect(() => {
        const rows = GetTemplates()
        rows.then(res => setTemplates(res.data.templates))
    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            ["template-options"]: { value: string, dataset: { id: string } },
            ["document-id"]: { value: string },
        }
        const { ["template-options"]: to, ["document-id"]: di } = target

        // console.log(to.dataset.id, di.value);
        if (to.dataset.id && di.value) {
            setErr(false)
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
            setErr(true)
        }
    }

    return <Fragment>
        <div className="generate-wrap">
            <h2 className="title title--3">Generate Textbook</h2>
            <form onSubmit={handleSubmit} className="mt-1 form">
                <div className="form">
                    <div className="fields">
                        <Input label="Choose Template" name='template-options' id='template_options' type="select" options={templates} />
                        <Input label="Document ID" name='document-id' id='document_id' />
                        {
                            err && <p>Oopes! Got in to some error</p>
                        }
                        {/* <div className="input-wrap input-wrap--text">
                            <label htmlFor="document_id">Document ID</label>
                            <input {...register("sheet")} type="text" name="document_id" id="document_id" />
                        </div> */}
                    </div>
                    <div className="commands">
                        <Button type="submit" text={caption} id='generate_textbook' variant='primary' />
                        <Button type="reset" text='Clear' id='clear_generate_fields' variant='danger' />
                    </div>
                </div>
            </form>


            {/* <div className="mt-4">
                <h5 className='title title--3'>Recent generated files</h5>
                <div className="mt-1 block-table">
                    <div className="item">
                        <DownloadStrip />
                    </div>
                    <div className="item">
                        <DownloadStrip />
                    </div>
                    <div className="item">
                        <DownloadStrip />
                    </div>
                </div>
            </div> */}
        </div>
    </Fragment>
}