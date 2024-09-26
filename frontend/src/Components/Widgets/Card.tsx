import { Fragment } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TemplateData } from "../../types";
import { TemplateDelete } from "../../Handlers/HandleTemplate";
import { showModal } from "../../Redux/Slices/modal";
import Button from "./button.widget";

type card = {
    template: TemplateData
}
export default function Card({ template }: card) {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const { id, name, screenshot, sheet } = template

    const { mutateAsync: DeleteTemplateMutate } = useMutation({
        mutationFn: TemplateDelete,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["templates"] })
    })

    const handleDelete = (id: string) => {
        DeleteTemplateMutate(id)
    }

    const handlePreview = () => {
        // dispatch(showModal({ show: true, data: template, modal: { type: "previewTemplate" } }))
        window.open(`/api/template/${id}/preview`, 'rel=noopener noreferrer')
    }

    const handleScreenshotPreivew = () => {
        dispatch(showModal({ show: true, data: { id: id, alt: name }, modal: { type: "previewScreenshot" } }))
    }

    return <Fragment>
        <div className="card" data-template-id={id} >
            <div className="card__controls">
                <Button title="Delete" variant="danger" icon onClick={() => handleDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9"></path><path d="M9.17 4a3.001 3.001 0 0 1 5.66 0" opacity=".5"></path></g></svg>
                </Button>
                <Button title="Preview" variant="transparent" icon onClick={handlePreview}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 3.266c.844-.012 3.64-.593 4.234 0c.592.593.012 3.39 0 4.234m-.228-4.009l-7.004 7.005M3.266 16.5c-.012.845-.593 3.641 0 4.234s3.39.012 4.234 0m3.002-7.236l-7.004 7.005" color="currentColor" /></svg>
                </Button>
            </div>
            <div className="card__img-wrap" role="button" onClick={handleScreenshotPreivew}>
                <img src={`api/template/${id}/screenshot`} alt={name} />
            </div>
            <div className="card__body">
                <h4 className="title title--6 card__title">{name}</h4>
                <a href={sheet} className="link link--external" target="__blank">Check document template</a>
            </div>
        </div>
    </Fragment>
}