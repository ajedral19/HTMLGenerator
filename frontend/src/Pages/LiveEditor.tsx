import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from 'react';
import DOMPurify from 'dompurify'
import Input from '../Components/Form/Input';
import { useQuery } from '@tanstack/react-query';
import { GetJSONData } from '../Utils/RequestHander';
export default function LiveEditor() {
    const [html, setHtml] = useState("<h1>hello</h1>")
    const { data: jsonData, isLoading } = useQuery({
        queryFn: () => GetJSONData(),
        queryKey: ["jsonData"]
    })


    const handleOnChange = (value: string) => {
        setHtml(value)
    }

    const handleRequest = () => {
        jsonData("https://docs.google.com/spreadsheets/d/1acVsraSP14boGIEes_FKXC489ZVoaZ04_uOJwbwXHXs/edit?gid=0#gid=0")
    }

    return <>
        <Input name='sheet_url' id='sheet_url' label='Enter Sheet URL' onChange={handleRequest} />
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

        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}></div>
    </>
}