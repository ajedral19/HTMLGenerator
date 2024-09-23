import { useSelector } from "react-redux"

export default function TemplateScreenshot() {
    const { id, alt } = useSelector((state: { modal: { data: { id: string, alt: string } } }) => state.modal.data)

    return <div className="screenshot-wrap">
        <img src={`/api/template/${id}/screenshot`} alt={alt} />
    </div>
}