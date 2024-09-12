import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from 'react';
import DOMPurify from 'dompurify'
import Input from '../Components/Form/Input';
import { useQuery } from '@tanstack/react-query';
import { GetJSONData } from '../Utils/RequestHander';
import MarkdownPreview from '@uiw/react-markdown-preview';
export default function LiveEditor() {
    const [html, setHtml] = useState("<h1>hello</h1>")
    const [url, setUrl] = useState("")

    const { data, isLoading } = useQuery({
        queryKey: ["jsonData", url],
        queryFn: () => GetJSONData(url),
    })


    const handleOnChange = (value: string) => {
        setHtml(value)
    }

    const handleRequest = (e: React.SyntheticEvent) => {
        const { value } = e.target as typeof e.target & { value: string }
        setUrl(value)
    }

    console.log(data?.rows);


    return <>
        <div className="flex">
            <div className="col col-12">
                <Input name='sheet_url' id='sheet_url' label='Enter Sheet URL' onChange={handleRequest} />
                <h4 className='mb-1'>Structured Data from Spreadsheet</h4>
                <MarkdownPreview style={{ width: "auto" }} source={isLoading ? `\`\`\`json \nloading...` : `\`\`\`json \n${JSON.stringify(data, null, " ")}`} />
            </div>
            <div className="col col-6">
                <AceEditor
                    placeholder='Play here'
                    mode="html"
                    theme="twilight"
                    name='test_editor'
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    onChange={handleOnChange}
                    value={html}
                    width='auto'
                    setOptions={{
                        enableLiveAutocompletion: true,
                        enableBasicAutocompletion: true,
                        enableMultiselect: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                    editorProps={{ $blockScrolling: true }}
                />

            </div>
            <div className="col col-6">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html, { IN_PLACE: true, FORBID_TAGS: ['style', 'script'], }) }}></div>
            </div>
        </div>

    </>
}