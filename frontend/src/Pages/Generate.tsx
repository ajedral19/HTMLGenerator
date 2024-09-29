import { Fragment } from "react/jsx-runtime";
import Input from "../Components/Form/Input";
// import { GenerateTexbook, GetSheetCount } from "../Handlers/RequestHander";
import { useState } from "react";
import fileDownload from "js-file-download";
import useGetTemplates from "../Hooks/useGetTemplates";
import { HTMLGenerate } from "../Handlers/HandleHTML";
import { Button } from "../Components/Widgets";
import { useQueryClient } from "@tanstack/react-query";

type Input = {
    document: string,
    sheet: string
}

export default function Generate() {
    const queryClient = useQueryClient()
    const [caption, setCaption] = useState("Generate")
    const [errMsg, setErrMsg] = useState(false)

    const templates = queryClient.getQueryData(['templates'])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            ["template-options"]: { value: string, dataset: { id: string } },
            ["document-id"]: { value: string },
            offset?: { value?: number },
            limit?: { value?: number }
        }
        const { ["template-options"]: to, ["document-id"]: di, offset, limit } = target


        if (to.dataset.id && di.value) {
            setErrMsg(false)
            setCaption("Fetching")
            HTMLGenerate(to.dataset.id, di.value, offset?.value, limit?.value)
                .then(res => {
                    if (res.data) {
                        const { headers } = res
                        const file = headers['content-disposition'].split(';')[1]
                        setCaption("Generate")
                        fileDownload(res.data, `${file}`)
                    }
                })
                .catch(err => console.log(err.message))
        } else {
            setErrMsg(true)
        }
    }

    return <Fragment>
        <div className="generate-wrap">
            <div className="flex">
                <h2 className="title title--3 col grow">Generate Textbook</h2>
                <p className="col">Request Timer</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-1 form">
                <div className="form">
                    <div className="fields">
                        <Input label="Spreadsheet URL" name='document-id' id='document_id' />
                        <code>if Spreadsheet url is valid, enable template selection</code>
                        <div className="flex">
                            <div className="col grow">
                                <Input label="Choose Template" name='template-options' id='template_options' type="select" options={templates.rows || []} />

                            </div>
                            <div className="col col-2">
                                <Input label="Offset" name="offset" id="offset" />
                            </div>
                            <div className="col col-2">
                                <Input label="Limit" name="limit" id="limit" />
                            </div>
                        </div>
                        {/* <input type="range" min={1} max={} /> */}
                        {
                            errMsg && <p>Oopes! Got in to some error</p>
                        }
                        <code>display parsed Spreadsheet to JSON here</code>
                        <code>add another field which allow the user to choose and offset where to begin to generating</code>
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