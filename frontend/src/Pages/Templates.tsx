import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { TemplateData } from "../types";
import useGetTemplates from "../CustomHooks/useGetTemplates";
export default function Templates() {
    const { templates, isLoading } = useGetTemplates()

    return <Fragment>
        <section className="templates-wrap">
            <h2 className="title title--3">Textbook templates</h2>
            <div className="mt-1 templates">

                {
                    !isLoading ?
                        templates?.rows.map((template: TemplateData, key: number) => (
                            <Fragment key={key}>

                                <Card template={template} />

                            </Fragment>
                        )) : "loading..."
                }
                <AddCardButton />
            </div>
        </section>
    </Fragment>
}