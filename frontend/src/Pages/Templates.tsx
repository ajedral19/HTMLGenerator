import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/Widgets/add_card_button.widget";
import { TemplateData } from "../types";
import useGetParams from "../Hooks/useGetParams";
import { Button, Card, Pagination } from "../Components/Widgets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTemplates } from "../Handlers/RequestHander";
export default function Templates() {

    const queryClient = useQueryClient()
    const templates = queryClient.getQueryData(['templates'])

    const { mutateAsync: MutateTemplate, isPending } = useMutation({
        mutationFn: GetTemplates,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['templates'] })
    })



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
                        <Button text={isPending ? "Loading" : "Refresh"} name="refresh" type="button" variant="primary" onClick={() => MutateTemplate()} />
                    </div>
                </div>
            </div>
            <div className="mt-1 templates col grow">
                {
                    templates?.rows.map((template: TemplateData, key: number) => (
                        <Fragment key={key}>
                            <Card template={template} />
                        </Fragment>
                    ))
                }
                <AddCardButton />
            </div>
            <div className="col">
                <Pagination pageCount={60} />
            </div>
        </section>
    </Fragment>
}