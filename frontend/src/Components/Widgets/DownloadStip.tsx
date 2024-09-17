import { useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { showModal } from "../Redux/Slices/modal";

export default function DownloadStrip() {
    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(showModal({ show: true, modal: { type: "download" } }))
    }

    return <Fragment>
        <div className="download-strip" onClick={handleOnClick}>
            <div className="download-strip__detail">
                <p className="detail">
                    <i className="detail__icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00016 1.66669C4.0835 1.66669 3.34183 2.41669 3.34183 3.33335L3.3335 16.6667C3.3335 17.5834 4.07516 18.3334 4.99183 18.3334H15.0002C15.9168 18.3334 16.6668 17.5834 16.6668 16.6667V6.66669L11.6668 1.66669H5.00016ZM10.8335 7.50002V2.91669L15.4168 7.50002H10.8335Z" fill="currentColor" />
                        </svg>
                    </i>
                    textbook_file_name
                    <span className="block">8:45 AM</span>
                    <span className="block">03/05/2924</span>
                </p>
            </div>
            <button className="btn btn--icon icon-download">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.3335 14.1666V15.8333C3.3335 16.2753 3.50909 16.6993 3.82165 17.0118C4.13421 17.3244 4.55814 17.5 5.00016 17.5H15.0002C15.4422 17.5 15.8661 17.3244 16.1787 17.0118C16.4912 16.6993 16.6668 16.2753 16.6668 15.8333V14.1666M5.8335 9.16665L10.0002 13.3333M10.0002 13.3333L14.1668 9.16665M10.0002 13.3333V3.33331" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    </Fragment>
}