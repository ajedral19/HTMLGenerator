import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import useExtract from '../Hooks/useExtract';
import Handlebars, { registerHelper } from 'handlebars'

export default function Fiddle() {
    const [html, setHtml] = useState<string>("<h1>hello</h1>")
    const [htmlOutput, setHtmlOutput] = useState<string>("")
    const { spreadsheet } = useSelector((state: { spreadsheet: { url: string } }) => state)
    const { data, isLoading } = useExtract(spreadsheet.url)

    useEffect(() => {
        Handlebars.registerHelper("loud", (text: string) => text.toUpperCase())
        const compile = Handlebars.compile(html)
        try {
            if (data.rows) {
                const render = compile(data.rows[0])
                setHtmlOutput(render)
            } else {
                setHtmlOutput(html)
            }
        } catch (e) {
            setHtmlOutput(html)
        }
    }, [html, data])

    const handleOnChange = (e: string) => {
        setHtml(e)

    }

    return <>
        <div className="flex">
            <MarkdownPreview wrapperElement={<div className='col col-12'></div>} style={{ width: "auto", maxHeight: '200px', overflow: 'auto' }} source={isLoading ? `\`\`\`json\n["loading"]` : `\`\`\`json\n${JSON.stringify(data.rows ? data.rows[0] : data, null, "  ")}`} />

            <div className="col col-8">
                <AceEditor
                    placeholder='Play here'
                    // mode="html"
                    theme="twilight"
                    name='test_editor'
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    onChange={(e) => handleOnChange(e)}
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
            <div className="col col-4">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlOutput, { IN_PLACE: true, FORBID_TAGS: ['style', 'script'], }) }}></div>
            </div>
        </div>

    </>
}