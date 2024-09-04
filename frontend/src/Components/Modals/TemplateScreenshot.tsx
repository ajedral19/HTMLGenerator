import { useSelector } from "react-redux"
import { Option } from "../../types"

export default function TemplateScreenshot() {
    const { img, alt } = useSelector((state: { modal: { data: { img: string, alt: string } } }) => state.modal.data)
    return <div className="screenshot-wrap">
        <img src={img} alt={alt} />
    </div>
}