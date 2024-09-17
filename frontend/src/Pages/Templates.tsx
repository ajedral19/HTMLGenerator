import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/Widgets/AddCardButton";
import { TemplateData } from "../types";
import useGetTemplates from "../Hooks/useGetTemplates";
import Button from "../Components/Widgets/Button";
import useGetParams from "../Hooks/useGetParams";
import { Card, Pagination } from "../Components/Widgets";
export default function Templates() {

    let { templates, isLoading, isPending, MutateTemplate } = useGetTemplates()
    const { page }: { page?: string } = useGetParams()

    return <Fragment>
        <section className="templates-wrap flex flow-column">
            <div className="flex">
                <div className="col grow flex items-center">
                    <h2 className="title title--3 col grow">Textbook templates</h2>
                    <div className="col">
                        <p>Filter here</p>
                    </div>
                    <div className="col">
                        <Button text={isPending ? "Loading" : "Refresh"} name="refresh" type="button" variant="primary" onClick={() => MutateTemplate(page)} />
                    </div>
                </div>
            </div>
            <div className="mt-1 templates col grow">
                {
                    !isLoading || !isPending ?
                        templates?.rows.map((template: TemplateData, key: number) => (
                            <Fragment key={key}>
                                <Card template={template} />
                            </Fragment>
                        )) : "loading..."
                }
                <AddCardButton />
            </div>
            <div className="col">
                <Pagination row_count={60} />
            </div>
        </section>
    </Fragment>
}