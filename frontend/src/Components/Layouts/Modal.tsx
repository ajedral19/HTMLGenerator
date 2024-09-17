import { Fragment } from "react/jsx-runtime";
import '../../Styles/Modal.sass'
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../Redux/Slices/modal";
import { useEffect } from "react";
import { modal_types } from "../../constants";
import Download from "../Modals/Download";
import Template from "../Modals/Template";
import TemplatePreview from "../Modals/TemplatePreview";
import TemplateScreenshot from "../Modals/TemplateScreenshot";

type Modal = {
    children?: React.ReactNode
}

export default function Modal({ children }: Modal) {
    const dispatch = useDispatch()
    const modal = useSelector((state: { modal: { modal: { type: string }, show: boolean } }) => state.modal)

    const handleOnClose = () => {
        dispatch(showModal({ show: false }))

    }

    useEffect(() => {
        document.onkeydown = (e) => {
            if (e.key)
                if (e.key.toLowerCase() === 'escape' && e.code.toLowerCase() === 'escape')
                    handleOnClose()
        }

        // fetchSheet()

    }, [document.onkeydown])

    const ModalContent = () => {

        if (modal_types.indexOf(modal.modal.type) >= 0) {
            switch (modal.modal.type) {
                case "download":
                    return <Download />
                case "addTemplate":
                    return <Template />
                case "previewTemplate":
                    return <TemplatePreview />
                case "previewScreenshot":
                    return <TemplateScreenshot />
                default:
                    return <h1>unknown</h1>
            }

        }
    }

    return (
        <Fragment>
            {
                modal.show ? (

                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal__header">
                                <p className="modal__header__title">Modal title</p>
                                <button className="btn transparent btn--icon modal-close-btn" onClick={handleOnClose}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.17605 13.7L0.300049 11.8333L5.12405 6.99998L0.300049 2.19998L2.17605 0.333313L7.00005 5.15331L11.7907 0.333313L13.6667 2.19998L8.84272 6.99998L13.6667 11.8333L11.7907 13.7L7.00005 8.87998L2.17605 13.7Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                            <div className="modal__body">
                                {
                                    children ||
                                    <ModalContent />
                                }
                            </div>
                        </div>
                    </div>

                ) : null
            }
        </Fragment>
    )
}