import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { TemplateData } from "../types";
import useGetTemplates from "../CustomHooks/useGetTemplates";
export default function Templates() {
    const { templates, isLoading } = useGetTemplates()

    return <Fragment>
        <section className="templates-wrap flex flow-column">
            <div className="flex">
                <h2 className="title title--2 col grow">Textbook templates</h2>
                <p className="col">Filter here</p>
            </div>
            <div className="mt-1 templates col grow">

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
            <p className="col">Pagination goes here</p>
        </section>
    </Fragment>
}