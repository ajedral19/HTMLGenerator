import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { Fragment, useEffect, useState } from "react";
import cn from 'classnames'
import style from '../Styles/editor.module.sass'
import { RiFileUploadFill } from 'react-icons/ri';
import Editable from './Widgets/Editable.widget';
import Select from './Widgets/Select.widget';
import { IoCodeDownloadOutline } from 'react-icons/io5';
import DOMPurify from 'dompurify';
import Handlebars from 'handlebars'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const stylesheets = [
    { id: "0123", name: "My Style" },
    { id: "0124", name: "New Sheet" },
    { id: "0125", name: "Sheety" },
]

type Helper = {
    name: string,
    task: (...args: any) => string | number | HTMLElement,
    description?: string
}
// helpers must be stored in database
// so both the banckend and the frontend will have access to it
// helpers must stored as a json objects

const temporaryHelpers: Helper[] = [
    {
        name: "loud",
        task: (str: string) => str.toUpperCase(),
        description: ""
    },
    {
        name: "underlined",
        task: (str: string) => `<h1>${str}</h1>`,
        description: ""
    },
    {
        name: "indexify",
        task: (index: number) => index + 1,
        description: ""
    }
]

export default function EditorView() {
    const htmlInit = "<p>Do you know Handlerbars? Visit <a href=\"https://handlebarsjs.com/\" target=\"_blank\">Handlebars</a>.</p>"
    const [state, setState] = useState<{ code: string, rendered: string }>({ code: htmlInit, rendered: "" })
    const { url, data } = useSelector((selector: RootState) => ({ data: selector.jsonData.data, url: selector.spreadsheet.url }))


    useEffect(() => {
        temporaryHelpers.forEach(({ name, task }) => {
            Handlebars.registerHelper(name, task)
        })
    }, [])

    useEffect(() => {
        const compile = Handlebars.compile(state.code, { data: false })

        try {
            const rendered = compile(data)
            setState((state) => ({ ...state, rendered }))
        } catch (error) {
            setState((state) => ({ ...state, rendered: state.code }))
        }

    }, [state.code, data])

    const handleEditor = (value: string) => {
        setState((state) => ({ ...state, code: value }))
    }

    const handleSave = () => {
        console.log(url);
        console.log(data);
        console.log(state.code, 'code')
    }

    const handleDownload = () => {
        console.log(state.rendered, 'rendered')
    }

    return <Fragment>
        <section className={style.editor_view}>
            <div className={cn(style.editor_view__editor)}>
                <div className={cn(style.editor_view__header)}>
                    <Editable defaultValue='Click to add title' />
                    <button className='btn btn--normal' onClick={handleSave}><RiFileUploadFill /> Save</button>
                </div>
                <div className={cn(style.editor_wrap)}>
                    <AceEditor
                        placeholder='Do you know Handlerbars? Visit handlebarsjs.com'
                        name='fiddle_editor'
                        width='100%'
                        height='100%'
                        fontSize="1.6rem"
                        mode="html"
                        theme="dracula"
                        lineHeight="1.6"
                        value={state.code}
                        editorProps={{
                            $blockScrolling: true,
                            $enableMultiselect: true,
                        }}
                        setOptions={{
                            enableLiveAutocompletion: true,
                            enableBasicAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            enableEmmet: true,
                            tabSize: 2,
                            showGutter: true,
                            showFoldWidgets: true,
                            showPrintMargin: true,
                            highlightActiveLine: true,
                            displayIndentGuides: true,
                            wrapBehavioursEnabled: true,
                        }}
                        onChange={handleEditor}
                    />
                </div>
            </div>
            <div className={cn(style.editor_view__render)}>
                <div className={cn(style.editor_view__header)}>
                    <Select name='stylesheets' options={stylesheets} placeholder='Chosse stylesheet' />
                    <button className='btn btn--normal' onClick={handleDownload}>Download <IoCodeDownloadOutline /></button>
                </div>

                <div className={cn(style.render_wrap)}>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.rendered, { IN_PLACE: true, FORBID_TAGS: ['script', 'style'] }) }}></div>
                </div>
            </div>
        </section>
    </Fragment >
}