import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify'
import Input from '../Components/Form/Input';
import MarkdownPreview from '@uiw/react-markdown-preview';
import useExtract from '../Hooks/useExtract';
import { Button } from '../Components/Widgets';
import Handlebars from 'handlebars'
import * as ace from 'ace-builds/src-noconflict/ace';
ace.config.set('basePath', '/');

const testData = [{
    name: "Jane Doe",
    age: 24,
    job: {
        title: 'Marketing Associate | SEO Specialist',
        company: "InnoVertex Corp."
    },
    biography: [
        " Passionate about digital marketing and search engine optimization, I currently serve as a Marketing Associate at InnoVertex Corp, where I focus on driving online visibility and enhancing brand engagement. With a keen analytical mindset, I thrive on developing data-driven strategies that elevate company performance.",
        "A proud middle child in a vibrant family, I have three siblings: Jannah (22), Jack (18), and John (15). Our diverse interests keep life exciting, and we often bond over outdoor adventures and community volunteering.",
        "Always eager to learn and adapt, I stay current with the latest marketing trends to ensure I contribute effectively to our team's goals. Let’s connect and explore new opportunities together!"
    ],

    siblings: [{ name: "John", age: 15 }, { name: 'Jannah', age: 22 }, { name: "Jack", age: 18 }],
}]

const testHtml = `
<h1 style="margin-bottom: 12px">{{ name }}</h1>
<blockquote><em>{{ job.title }} at <b>{{ job.company }}</b></em></blockquote>
<br />
<ul>
    {{#biography}}
        <li style="margin-bottom: 12px">{{ . }}</li>
    {{/biography}} 
</ul>
<hr>
<br />
<h2>{{ name }} also have siblings</h2>
<ol style="margin-top: 10px">
  {{#siblings}}
  <li style="margin-bottom: 10px">
    name:  {{ this.name }}<br />
    age: {{ this.age }}
  </li>
  {{/siblings}}
</ol>
`



export default function LiveEditor() {
    const [html, setHtml] = useState<string>(testHtml)
    const [preview, setPreview] = useState(html)
    const [url, setUrl] = useState<string>("")
    const { data, isLoading } = useExtract(url)


    const ref = useRef()

    const render = (str) => {
        try {
            const document = Handlebars.compile(str)
            const render = document(data?.rows ? data?.rows[0] : testData[0])
            setPreview(render)
        } catch (err) {
            if (err)
                setPreview(str)
            // console.log(err.name, err.message);
        }
    }

    const handleOnChange = (value: string) => {
        setHtml(value)
        render(value)
    }

    const handleRequest = () => {
        const value = ref.current.value
        setUrl(() => value)
    }

    useEffect(() => {
        render(html)
    }, [data?.rows])


    return <>
        <div className="flex">
            <h2 className="title title--3 col grow">Template Playground</h2>
            {/* <p className="col">Request Timer</p> */}
        </div>
        <div className="flex">
            <div className='col grow'>
                <Input name='sheet_url' id='sheet_url' ref={ref} />
            </div>
            <div className="col">
                <Button name='extract' text='Extract' onClick={handleRequest} />
            </div>
            <div className='col col-12'>
                <h4 className='mb-1'>Structured Data from Spreadsheet {data?.rows ? null : "(test data you can play with)"}</h4>
                <MarkdownPreview style={{ width: "inherit", maxWidth: '1200px', maxHeight: '400px', overflow: 'auto' }} source={isLoading ? `\`\`\`json \nloading...` : `\`\`\`json \n${JSON.stringify(data?.rows || testData, null, " ")}`} />
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
                    onChange={handleOnChange}
                    highlightActiveLine={true}
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
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview, { IN_PLACE: true, FORBID_TAGS: ['style', 'script'], }) }}></div>
            </div>
        </div>

    </>
}