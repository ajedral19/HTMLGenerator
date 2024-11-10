import style from '../Styles/fiddle.module.sass'
import cn from 'classnames'
import { IoCodeDownloadOutline } from 'react-icons/io5';
import { RiFileUploadFill } from 'react-icons/ri';
import Select from '../Components/Widgets/Select.widget';
import Editable from '../Components/Widgets/Editable.widget';
import Tabs from '../Components/Widgets/Tabs.widget';
import MarkdownPreview from '@uiw/react-markdown-preview'
import DataView from '../Components/DataView';
import { useRender } from '../Hooks/useRender';
import EditorView from '../Components/EditorView';

export default function Fiddle() {
    const tabs = [
        {
            name: "Data",
            component: <DataView />
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

    // const { render } = useRender()

    return <>
        <section className={cn(style.fiddle)}>
            <aside className={cn(style.fiddle_finder)}>
                {/* ANCHOR panels */}
                <Tabs tabs={tabs} />
            </aside>
            <main className={cn(style.fiddle__main_panel)}>
                <EditorView />
            </main>
        </section>
    </>
}
