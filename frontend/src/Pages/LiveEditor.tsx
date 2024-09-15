import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from 'react';
import DOMPurify from 'dompurify'
import Input from '../Components/Form/Input';
import MarkdownPreview from '@uiw/react-markdown-preview';
import useExtract from '../Hooks/useExtract';
import Button from '../Components/Widgets/Button';
export default function LiveEditor() {
    const [html, setHtml] = useState<string>("<h1>hello</h1>")
    const [url, setUrl] = useState<string>("")

    const { data, isLoading } = useExtract(url)

    const handleOnChange = (value: string) => {
        setHtml(value)
    }


    const handleRequest = () => {
        const { value } = e.target as typeof e.target & { value: string }
        setUrl(() => value)
    }


    return <>
        <div className="flex">
            <h2 className="title title--3 col grow">Template Playground</h2>
            {/* <p className="col">Request Timer</p> */}
        </div>
        <div className="flex">
            <div className='col grow'>
                <Input name='sheet_url' id='sheet_url' onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="col">
                <Button name='extract' text='Extract' />
            </div>
            <div className='col col-12'>
                <h4 className='mb-1'>Structured Data from Spreadsheet</h4>
                <MarkdownPreview style={{ width: "auto", maxHeight: '400px', overflow: 'auto' }} source={isLoading ? `\`\`\`json \nloading...` : `\`\`\`json \n${JSON.stringify(data?.rows, null, " ")}`} />
            </div>
        </div>
        <div className="flex">
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