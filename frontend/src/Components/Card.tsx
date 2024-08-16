import { Fragment } from "react/jsx-runtime";
import Button from "./Button";
import { DeleteTemplate, GetTemplate } from "../Utils/RequestHander";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../Redux/Slices/modal";
import { Option } from "../types";

type card = {
    id: string,
    name: string,
    sheet: string,
    template?: string,
    screenshot?: string,
    // screenshot: { data: [] },
}
export default function Card({ id, name, sheet /*screenshot*/ }: card) {
    const dispatch = useDispatch()
    const data = useSelector((state: { templates: { data: Option[] } }) => state.templates.data)

    // const base64Str = btoa(String.fromCharCode(...new Uint8Array(template_screenshot.data)))

    const handleDelete = (id: string) => {
        DeleteTemplate(id)
    }

    const handleUpdate = (id: string) => {
        DeleteTemplate(id)
    }

    const handlePreview = (id: string) => {
        const template = data.filter(item => item.id === id)
        dispatch(showModal({ show: true, data: template.length ? template[0] : null, modal: { type: "previewTemplate" } }))
    }

    return <Fragment>
        <div className="card" data-template-id={id} >
            <div className="card__controls">
                <Button title="Download Template" variant="primary" icon onClick={() => handleUpdate(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path strokeMiterlimit="10" d="M12 15.238V3.213"></path><path strokeLinejoin="round" d="m7.375 10.994l3.966 3.966a.937.937 0 0 0 1.318 0l3.966-3.966"></path><path strokeLinejoin="round" d="M2.75 13.85v4.625a2.313 2.313 0 0 0 2.313 2.313h13.874a2.313 2.313 0 0 0 2.313-2.313V13.85"></path></g></svg>
                </Button>
                <Button title="Update" variant="secondary" icon onClick={() => handleUpdate(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"></path><path d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829c-.205.262-.38.547-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-5.965 5.965c-.404.404-.606.606-.829.78a4.59 4.59 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9"></path></g></svg>
                </Button>
                <Button title="Delete" variant="danger" icon onClick={() => handleDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9"></path><path d="M9.17 4a3.001 3.001 0 0 1 5.66 0" opacity=".5"></path></g></svg>
                </Button>
                <Button title="Preview" variant="transparent" icon onClick={() => handlePreview(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 3.266c.844-.012 3.64-.593 4.234 0c.592.593.012 3.39 0 4.234m-.228-4.009l-7.004 7.005M3.266 16.5c-.012.845-.593 3.641 0 4.234s3.39.012 4.234 0m3.002-7.236l-7.004 7.005" color="currentColor" /></svg>
                </Button>
            </div>
            <div className="card__img-wrap">
                {/* <img src={`data:image/webp;base64,${base64Str}`} alt={template_name} /> */}
            </div>
            <div className="card__body">
                <h4 className="title title--5 card__title">{name}</h4>
                <a href={sheet} className="link link--external" target="__blank">Check document template</a>
            </div>
        </div>
    </Fragment>
}