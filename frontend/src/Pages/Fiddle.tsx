import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import style from '../Styles/fiddle.module.sass'
import cn from 'classnames'
import { FaChevronDown } from 'react-icons/fa6';
import { IoCodeDownloadOutline } from 'react-icons/io5';
import { RiFileUploadFill } from 'react-icons/ri';


export default function Fiddle() {


    return <>
        <section className={cn(style.fiddle)}>
            <aside className={cn(style.fiddle_finder)}>
                {/* ANCHOR panels */}
                <div className={cn(style.panels)}>
                    <ul className={cn(style.panels__tabs)}>
                        <li role='button' className={cn(style.panels__tabs__tab)}>Data</li>
                        <li role='button' className={cn(style.panels__tabs__tab)}>CSS</li>
                        <li role='button' className={cn(style.panels__tabs__tab)}>Helpers</li>
                    </ul>
                    <div className={cn(style.panels__panel)}></div>
                </div>
            </aside>
            <main className={cn(style.fiddle__main_panel)}>
                <div className={cn(style.fiddle_pane, style.fiddle_editor_pane)}>
                    <div className={cn(style.fiddle_pane__header)}>
                        <p>Click to add title</p>
                        <p role='button'><RiFileUploadFill /> Save</p>
                    </div>
                    <div className={cn(style.fiddle_pane__body, style.editor_wrap)}>
                        <AceEditor name='fiddle_editor' height='100%' width='100%' mode="html" placeholder='Fiddle' theme='dracula' />
                    </div>
                </div>
                <div className={cn(style.fiddle_pane, style.fiddle_result_pane)}>
                    <div className={cn(style.fiddle_pane__header)}>
                        <p>Choose Stylesheet <FaChevronDown fontSize="1.2rem" /></p>
                        <p role='button'>Download <IoCodeDownloadOutline /></p>
                    </div>
                    <div className={cn(style.fiddle_pane__body, style.result_wrap)}>

                    </div>
                </div>
            </main>
        </section>
    </>
}
