import { useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";

import useOptionFilter from "../../CustomHooks/useOptionFilter";
import { FieldInput, Option, Target } from "../../types";
import { SVGDownload } from "../../svgAssets";

export default function Input({ label, name, id, type, options, onChange }: FieldInput) {

    const [inputText, setInputText] = useState<string>("")
    const [toggled, setToggled] = useState<boolean>(false)
    const fff = useOptionFilter(inputText, options);
    const [_id, set_id] = useState("")


    const input_ref = useRef<HTMLInputElement | null>(null)

    const handleToggle = () => setToggled(state => !state)

    const handleOnChange = (e: Target) => {
        if (onChange) return onChange(e)

        setInputText(e.target.value)
        setToggled(true)
    }

    const handleOnSelect = (title: string, template_id: string) => {
        setInputText("")
        input_ref.current!.value = title
        set_id(template_id)
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
                    <input type="text" name={name} id={id} autoComplete="off" role="presesntation" onChange={handleOnChange} onClick={handleToggle} ref={input_ref} data-id={_id} />
                    {
                        toggled ?
                            <ul className="input-wrap--select__options">
                                {
                                    fff?.map((option: Option, key: number) => (
                                        option ?
                                            <li className="option" data-id={option.id} key={key} onClick={() => handleOnSelect(option.name, option.id)}>
                                                <div className="option__preview">
                                                    <img src={`/api/template/${option.screenshot}`} alt={option.name} />
                                                </div>
                                                <div className="option__body">
                                                    <p className="">{option.name}</p>
                                                    <a href={option.sheet} className="link link--external" target="__blank">Document template URL</a>
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