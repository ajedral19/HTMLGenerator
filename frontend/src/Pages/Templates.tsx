import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { Suspense, useEffect, useState } from "react";
import { Option, Target } from "../types";
import useOptionFilter from "../CustomHooks/useOptionFilter";
import Input from "../Components/Form/Input";
import useGetTemplates from "../CustomHooks/useGetTemplates";
import Button from "../Components/Button";


export default function Templates() {
    // transfer to reducer
    // const [templates, setTemplates] = useState<Option[]>([])

    const { isPending, data } = useGetTemplates()

    // const base64 = Buffer.from(templates[0].template_html)


    return <Fragment>
        <section className="templates-wrap">
            <h2 className="title title--3">Textbook templates</h2>
            <div className="mt-1 templates">

                {
                    !isPending ?
                        data?.data.templates.map((template, key) => (
                            <Fragment key={key}>
                                <Suspense fallback="<h1>loading...</h1>">

                                    <Card id={template.id} sheet={template.sheet} name={template.name} screenshot={template.screenshot} />
                                </Suspense>
                                {/* <div dangerouslySetInnerHTML={{ __html: `${template.template}` }}></div> */}
                                {/* <p>{template.template}</p> */}
                            </Fragment>
                        )) : "loading..."
                }
                <AddCardButton />
            </div>
        </section>
    </Fragment>
}