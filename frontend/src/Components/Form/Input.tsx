import { useRef, useState, forwardRef } from "react";
import { Fragment } from "react/jsx-runtime";

import useOptionFilter from "../../Hooks/useOptionFilter";
import { FieldInput, Option, Target } from "../../types";
import { SVGDownload } from "../../svgAssets";
import cn from 'classnames'

const Input = forwardRef((props: FieldInput, ref) => {
    const { label, name, id, type, options, className, onChange, disabled = false } = props
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
                <div className={cn("input-wrap input-wrap--text", className)}>
                    {label && <label htmlFor={id}>{label}</label>}
                    <input disabled={disabled} type="text" name={name} id={id} onChange={handleOnChange} ref={ref || input_ref} />
                </div>
                :
                <div className={cn("input-wrap input-wrap--text input-wrap--select", className)}>
                    {label && <label htmlFor={id}>{label}</label>}
                    <input disabled={disabled} type="text" name={name} id={id} autoComplete="off" role="presesntation" onChange={handleOnChange} onClick={handleToggle} ref={ref || input_ref} data-id={_id} />
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
})

export default Input