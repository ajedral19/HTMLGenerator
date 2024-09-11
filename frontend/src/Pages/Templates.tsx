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
        <section className="templates-wrap">
            <div className="mb-2">
                <h2 className="title title--3 mb-1">See Sheet JSON format</h2>
                <Input label="Enter Sheet URL" onChange={handleOnChange} />
            </div>
            <h2 className="title title--3 mb-1">Textbook templates</h2>
            <Button text={isPending ? "Loading" : "Refresh"} name="refresh" type="button" variant="primary" onClick={handleRefresh} />
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