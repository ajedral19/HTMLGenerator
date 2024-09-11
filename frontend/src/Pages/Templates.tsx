import { Fragment } from "react/jsx-runtime";
import AddCardButton from "../Components/AddCardButton";
import Card from "../Components/Card";
import { TemplateData } from "../types";
import useGetTemplates from "../CustomHooks/useGetTemplates";
import Button from "../Components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTemplates } from "../Utils/RequestHander";
import Input from "../Components/Form/Input";
export default function Templates() {
    let { templates, isLoading } = useGetTemplates()
    const queryClient = useQueryClient()


    const { mutateAsync: RefreshMutation, isPending } = useMutation({
        mutationFn: GetTemplates,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['templates'] })
    })

    const handleRefresh = () => RefreshMutation(undefined)

    const handleOnChange = () => {
        // dispatch modal
    }

    return <Fragment>
        <section className="templates-wrap flex flow-column">
            <div className="flex">
                <h2 className="title title--2 col grow">Textbook templates</h2>
                <div className="col">
                    <p className="col">Filter here</p>
                    <Button text={isPending ? "Loading" : "Refresh"} name="refresh" type="button" variant="primary" onClick={handleRefresh} />
                </div>

            </div>
            <div className="mb-2">
                <h2 className="title title--3 mb-1">See Sheet JSON format</h2>
                <Input label="Enter Sheet URL" onChange={handleOnChange} />
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