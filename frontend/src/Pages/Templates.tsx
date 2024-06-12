import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { GetTemplates } from "../Utils/RequestHander";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getTemplates } from "../Redux/Slices/templates";

type templates = {
    _id: string,
    template_document: string,
    template_name: string
}

export default function Templates() {
    const init: templates[] = [
        {
            _id: "",
            template_document: "",
            template_name: ""
        }
    ]

    const [templates, setTemplates] = useState(init)

    useEffect(() => {
        const rows = GetTemplates()
        rows.then(res => setTemplates(res.data))
    }, [])

    return <Fragment>
        <section className="templates-wrap">
            <h2 className="title title--3">Textbook templates</h2>
            <div className="mt-1 templates">
                {
                    templates.length ?
                        templates.map((template, key) => <Card key={key} id={template._id} document_template_url={template.template_document} template_name={template.template_name} />)
                        : null
                }
                <AddCardButton />
            </div>
        </section>
    </Fragment>
}