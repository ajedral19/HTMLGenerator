import { useSelector } from "react-redux"

export default function TemplateScreenshot() {
    const { img, alt } = useSelector((state: { modal: { data: { img: string, alt: string } } }) => state.modal.data)

    return <div className="screenshot-wrap">
        <img src={`/api/template/${id}/preview`} alt={alt} />
    </div>
}