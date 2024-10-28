import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import style from '../Styles/fiddle.module.sass'
import cn from 'classnames'
import { IoCodeDownloadOutline } from 'react-icons/io5';
import { RiFileUploadFill } from 'react-icons/ri';
import Select from '../Components/Widgets/Select.widget';
import Editable from '../Components/Widgets/Editable.widget';
import Tabs from '../Components/Widgets/Tabs.widget';
import MarkdownPreview from '@uiw/react-markdown-preview'
import CodeView from '../Components/CodeView';

const stylesheets = [
    { id: "0123", name: "My Style" },
    { id: "0124", name: "New Sheet" },
    { id: "0125", name: "Sheety" },
]


export default function Fiddle() {
    const tabs = [
        {
            name: "Data",
            component: <CodeView />
            // component: <MarkdownPreview source={`\`\`\`json\n${JSON.stringify(data, null, "  ")}`} style={{ display: "block", overflow: "auto" }} />

        },
        {
            name: "CSS",
            component: <MarkdownPreview source={"\`\`\`css\nbody: {padding: 0;}"} style={{ display: "block", height: "100%" }} />
        },
        {
            name: "Helpers",
            component: <h1>Hello from helpers</h1>
        },
    ]
    return <>
        <section className={cn(style.fiddle)}>
            <aside className={cn(style.fiddle_finder)}>
                {/* ANCHOR panels */}
                <Tabs tabs={tabs} />
            </aside>
            <main className={cn(style.fiddle__main_panel)}>
                <div className={cn(style.fiddle_pane, style.fiddle_editor_pane)}>
                    <div className={cn(style.fiddle_pane__header)}>
                        <Editable defaultValue='Click to add title' />
                        <p role='button'><RiFileUploadFill /> Save</p>
                    </div>
                    <div className={cn(style.fiddle_pane__body, style.editor_wrap)}>
                        <AceEditor name='fiddle_editor' height='100%' width='100%' mode="html" placeholder='Fiddle' theme='dracula' />
                    </div>
                </div>
                <div className={cn(style.fiddle_pane, style.fiddle_result_pane)}>
                    <div className={cn(style.fiddle_pane__header)}>
                        <Select name='stylesheets' options={stylesheets} placeholder='Chosse stylesheet' />
                        {/* <p>Choose Stylesheet <FaChevronDown fontSize="1.2rem" /></p> */}
                        <p role='button'>Download <IoCodeDownloadOutline /></p>
                    </div>
                    <div className={cn(style.fiddle_pane__body, style.result_wrap)}>

                    </div>
                </div>
            </main>
        </section>
    </>
}
