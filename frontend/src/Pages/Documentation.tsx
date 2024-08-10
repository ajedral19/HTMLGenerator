import { Fragment } from "react/jsx-runtime";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { readFileDataAsBase64 } from "../Utils/FileHandlers";
import fs from 'fs/promises'
// import documentation from '../../Documentation.md'
import { useEffect, useState } from "react";



export default function Documentation() {
    const wrapper_element = {
        "data-color-mode": "light"
    }

    const [markdown, setMarkdown] = useState("")

    useEffect(() => {
        import('../../Documentation.md')
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setMarkdown(res))
                    .catch(err => console.log(err))
            })
    }, [])



    // fs.readFile('',).then(res => console.log(res)).catch(err => console.log(err.message))


    // base64.then(res => console.log(res))




    return <Fragment>
        <MarkdownPreview source={markdown} wrapperElement={wrapper_element} style={{ padding: "0" }} />
    </Fragment>
}