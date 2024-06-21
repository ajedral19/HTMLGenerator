import { useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import useOptionFilter from "../../CustomHooks/useOptionFilter";
import { FieldInput, Option, Target } from "../../types";
import { SVGDownload } from "../../svgAssets";

export default function Input({ label, name, id, type, options, onChange }: FieldInput) {
    const [inputText, setInputText] = useState<string>("")
    const [toggled, setToggled] = useState<boolean>(false)
    const fff = useOptionFilter(inputText, options);


    const input_ref = useRef<HTMLInputElement | null>(null)

    const handleToggle = () => setToggled(state => !state)

    const handleOnChange = (e: Target) => {
        if (onChange) return onChange(e)

        setInputText(e.target.value)
        setToggled(true)
    }

    const handleOnSelect = (title: string) => {
        setInputText("")
        input_ref.current!.value = title
        setToggled(false)
    }

    return <Fragment>
        {
            !type ?
                <div className="input-wrap input-wrap--text">
                    <label htmlFor={id}>{label}</label>
                    <input type="text" name={name} id={id} onChange={handleOnChange} />
                </div>
                :
                <div className="input-wrap input-wrap--select">
                    <label htmlFor={id}>{label}</label>
                    <input type="text" name={name} id={id} autoComplete="off" role="presesntation" onChange={handleOnChange} onClick={handleToggle} ref={input_ref} data-id={id} />
                    {
                        toggled ?
                            <ul className="input-wrap--select__options">
                                {
                                    fff?.map((option: Option, key: number) => (
                                        option ?
                                            <li className="option" data-id={option._id} key={key} onClick={() => handleOnSelect(option.template_name)}>
                                                <div className="option__preview">
                                                    <img src="./images/template-placeholder.png" alt="textbook name" />
                                                </div>
                                                <div className="option__body">
                                                    <p className="">{option.template_name}</p>
                                                    <a href={option.template_document} className="link link--external" target="__blank">Document template URL</a>
                                                </div>
                                                <button className="btn btn--icon icon-download option__action">
                                                    <SVGDownload />
                                                </button>
                                            </li>
                                            : null
                                    ))
                                }
                            </ul>
                            : null
                    }
                </div>

        }
    </Fragment>
}