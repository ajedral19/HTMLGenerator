import { Fragment } from "react/jsx-runtime";
import Input from "../Components/Form/IInput";
import DownloadStrip from "../Components/DownloadStip";
import Button from "../Components/Button";

// import { DownloadFile, GenerateTexbook } from "../Utils/Generator";
import { GenerateTexbook, GetTemplates } from "../Utils/RequestHander";

// import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

export default function Generate() {
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        const rows = GetTemplates()
        rows.then(res => setTemplates(res.data))
    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()


        const target = e.target as typeof e.target & {
            ["template-options"]: { value: string, dataset: { id: string } },
            ["document-id"]: { value: string },
        }
        const { ["template-options"]: to, ["document-id"]: di } = target

        // console.log(to.dataset.id, di.value);

        GenerateTexbook(to.dataset.id, di.value)
    }

    return <Fragment>
        <div className="generate-wrap">
            <h2 className="title title--3">Generate Textbook</h2>
            <form onSubmit={handleSubmit} className="mt-1 form">
                <div className="form">
                    <div className="fields">
                        <Input label="Choose Template" name='template-options' id='template_options' type="select" options={templates} />
                        <Input label="Document ID" name='document-id' id='document_id' />
                    </div>
                    <div className="commands">
                        <Button type="submit" text='Generate' id='generate_textbook' variant='primary' />
                        <Button text='Clear' id='clear_generate_fields' variant='danger' />
                    </div>
                </div>
            </form>


            <div className="mt-4">
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
            </div>
        </div>
    </Fragment>
}