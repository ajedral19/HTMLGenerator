import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

type option = {
    _id: string,
    template_name: string,
    template_document: string,
    template_screenshot?: string
}

type Input = {
    label: string,
    name: string,
    id: string,
    type?: 'select'
    options?: option[]
}

export default function Input({ label, name, id, type, options }: Input) {
    const [toggled, setToggled] = useState(false)
    const [val, setVal] = useState<string[]>([])

    const handleToggle = () => {
        setToggled(!toggled)
    }

    const handleOnSelect = (title: string, id: string) => {
        setVal([title, id]);
    }




    return <Fragment>
        {
            !type ?
                <div className="input-wrap input-wrap--text">
                    <label htmlFor={id}>{label}</label>
                    <input type="text" name={name} id={id} />
                </div>
                :
                <div className="input-wrap input-wrap--select">
                    <label htmlFor={id}>{label}</label>
                    <input type="text" name={name} id={id} autoComplete="off" role="presesntation" onClick={handleToggle} value={val[0]} data-id={val[1]} />
                    {
                        toggled ?
                            <ul className="input-wrap--select__options">
                                {
                                    options?.map((option, key) => (
                                        <li className="option" data-id={option._id} key={key} onClick={() => handleOnSelect(option.template_name, option._id)}>
                                            <div className="option__preview">
                                                <img src="./images/template-placeholder.png" alt="textbook name" />
                                            </div>
                                            <div className="option__body">
                                                <p className="">{option.template_name}</p>
                                                <a href={option.template_document} className="link link--external" target="__blank">Document template URL</a>
                                            </div>
                                            <button className="btn btn--icon icon-download option__action">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.3335 14.1666V15.8333C3.3335 16.2753 3.50909 16.6993 3.82165 17.0118C4.13421 17.3244 4.55814 17.5 5.00016 17.5H15.0002C15.4422 17.5 15.8661 17.3244 16.1787 17.0118C16.4912 16.6993 16.6668 16.2753 16.6668 15.8333V14.1666M5.8335 9.16665L10.0002 13.3333M10.0002 13.3333L14.1668 9.16665M10.0002 13.3333V3.33331" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                            : null
                    }
                </div>

        }
    </Fragment>
}