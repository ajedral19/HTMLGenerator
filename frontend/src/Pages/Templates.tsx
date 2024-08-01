import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { GetTemplates } from "../Utils/RequestHander";
import { useEffect, useState } from "react";
import { Option, Target } from "../types";
import useOptionFilter from "../CustomHooks/useOptionFilter";
import Input from "../Components/Form/Input";
import io from 'socket.io-client'

const socket = io('http://localhost:9100')

export default function Templates() {
    const [templates, setTemplates] = useState<Option[]>([])
    const [filtered, setFiltered] = useState<Option[] | undefined>([])
    const [text, setText] = useState("")

    const data = useOptionFilter(text, templates)

    const handleOnChange = (e: Target) => {
        if (!e.target.value) setFiltered(templates)
        setText(e.target.value);
        // socket.emit('test', { text: "ahh ok ok hehe" })
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        })

        socket.on('get_templates', (data) => setTemplates(data.data))

        socket.on('disconnect', () => {
            console.log('Disconnected to server');

        })
    }, [])

    useEffect(() => {
        const rows = GetTemplates()
        rows.then(res => setTemplates(res.data))
    }, [])

    useEffect(() => {
        setFiltered(data)
    }, [text, data])

    return <Fragment>
        <section className="templates-wrap">
            <Input label="Find template by name" name="test" id="test" onChange={handleOnChange} />
            <h2 className="title title--3">Textbook templates</h2>
            <div className="mt-1 templates">
                {
                    filtered?.length ?
                        filtered.map((template, key) => <Card key={key} id={template._id} document_template_url={template.template_document} template_name={template.template_name} />)
                        :
                        templates?.length ?
                            templates.map((template, key) => <Card key={key} id={template._id} document_template_url={template.template_document} template_name={template.template_name} />)
                            : null
                }
                <AddCardButton />
            </div>
        </section>
    </Fragment>
}