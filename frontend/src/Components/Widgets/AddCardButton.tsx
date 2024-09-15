import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { showModal } from "../../Redux/Slices/modal";

export default function AddCardButton() {
    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(showModal({ show: true, modal: { type: "addTemplate" } }))
    }

    return <Fragment>
        <div className="card">
            <button className="card__add-btn" onClick={handleOnClick}>
                <span className="icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.3334 17.3307H17.3334V25.3307H14.6667V17.3307H6.66669V14.664H14.6667V6.664H17.3334V14.664H25.3334V17.3307Z" fill="currentColor" />
                    </svg>

                </span>
                <span>Add new template</span>
            </button>
        </div>
    </Fragment>
}