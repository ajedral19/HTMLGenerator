import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import { Option, Target } from "../types";
import useOptionFilter from "../CustomHooks/useOptionFilter";
import Input from "../Components/Form/Input";
import useGetTemplates from "../CustomHooks/useGetTemplates";
import Button from "../Components/Button";


export default function Templates() {
    // transfer to reducer
    // const [templates, setTemplates] = useState<Option[]>([])
    const [filtered, setFiltered] = useState<Option[] | undefined>([])

    const templates = useGetTemplates()

    const [text, setText] = useState("")

    const data = useOptionFilter(text, templates)

    const handleOnChange = (e: Target) => {
        if (!e.target.value) setFiltered(templates)
        setText(e.target.value);
    }

    useEffect(() => {
        setFiltered(data)
    }, [text, data])

    return <Fragment>
        <section className="templates-wrap">
            <div className="mt-1 mb-2">
                <h2 className="title title--3">Stylesheets</h2>
                <div className="mt-1">
                    <Button type="button" variant="primary" text="Upload Stylesheet" />
                    <ul className="listbox mt-1">
                        <li>Sheet 1</li>
                        <li>Sheet 2</li>
                        <li>Sheet 3</li>
                        <li>Sheet 4</li>
                    </ul>
                </div>
            </div>
            <div className="mt-1 mb-2">
                <Input label="Find template by name" name="test" id="test" onChange={handleOnChange} />
            </div>
            <h2 className="title title--3">Textbook templates</h2>
            <div className="mt-1 templates">
                {
                    filtered?.length ?
                        filtered.map((template, key) => <Card key={key} id={template._id} document_template_url={template.template_document} template_name={template.template_name} template_screenshot={template.template_screenshot} />)
                        :
                        templates?.length ?
                            templates.map((template, key) => <Card key={key} id={template._id} document_template_url={template.template_document} template_name={template.template_name} template_screenshot={template.template_screenshot} />)
                            : null
                }
                <AddCardButton />
            </div>
        </section>
    </Fragment>
}