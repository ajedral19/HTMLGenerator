import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useSelector } from 'react-redux';
import useExtract from '../Hooks/useExtract';
import Handlebars, { registerHelper } from 'handlebars'
import cn from 'classnames'
import style from '../Styles/global.module.sass'

export default function Fiddle() {
    const [html, setHtml] = useState<string>("<h1>hello</h1>")
    const [htmlOutput, setHtmlOutput] = useState<string>("")
    const { url } = useSelector((state: { spreadsheet: { url: string } }) => state.spreadsheet)
    const { data, isLoading } = useExtract(url)

    useEffect(() => {
        Handlebars.registerHelper("loud", (text: string) => text.toUpperCase())
        Handlebars.registerHelper("testhelper", (text: string, phrase: string) => {
            return [
                text.toUpperCase(),
                phrase.toLowerCase()
            ]
        })
        Handlebars.registerHelper("blank", (text: string, ...args) => {
            const replace = (str: string) => (str.split('').map(_ => '_').join(''))
            console.log(args);
            return args.map(arg => {
                if (typeof arg !== 'object')
                    return (text.replace(arg, replace(arg)))

            })
        })

        const compile = Handlebars.compile(html)

        try {
            if (data.rows) {
                const render = compile(data.rows[0])
                setHtmlOutput(render)
            } else {
                const render = compile(data)
                setHtmlOutput(render)

            }
        } catch (e) {
            setHtmlOutput(html)
        }
    }, [html, data])

    const handleOnChange = (e: string) => {
        setHtml(e)
    }

    return <>
        <div className={cn(style.fiddle)}>
            <div className={cn(style.fiddle__data)}>
                <MarkdownPreview
                    source={isLoading ? `\`\`\`json\n["loading"]` : `\`\`\`json\n${JSON.stringify(data.rows ? data.rows[0] : data, null, "  ")}`} />
            </div>

            <div className={cn(style.fiddle__editor)}>
                <AceEditor
                    placeholder='Play here'
                    name='test_editor'
                    onChange={(e) => handleOnChange(e)}
                    value={html}
                    width='100%'
                    height='100%'
                    fontSize="1.6rem"
                    mode="html"
                    theme="twilight"
                    lineHeight="1.6"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableLiveAutocompletion: true,
                        enableBasicAutocompletion: true,
                        enableMultiselect: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        enableEmmet: true,
                        tabSize: 2,
                        showGutter: true,
                        showFoldWidgets: true,
                        showPrintMargin: true,
                        highlightActiveLine: true,
                        displayIndentGuides: true,
                    }}
                />

            </div>
            <div className={cn(style.fiddle__view)}>
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlOutput, { IN_PLACE: true, FORBID_TAGS: ['style', 'script'], }) }}>
                </div>
            </div>
        </div>

    </>
}