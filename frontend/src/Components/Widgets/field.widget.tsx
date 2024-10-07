import { Fragment } from "react/jsx-runtime";
import { ForwardedRef, forwardRef } from "react";
import cn from 'classnames'
import style from '../../Styles/field.module.sass'
import { ChangeHandler, FieldError } from "react-hook-form";
import Tooltip from "./tooltip.widget";

type Input = {
    id?: string
    name?: string
    label?: string
    className?: string
    placeholder?: string
    type?: "text"
    icon?: JSX.Element
    disabled?: boolean
    defaultValue?: string
    tip?: string
    error?: FieldError
    onChange?: ChangeHandler
    onBlur?: ChangeHandler
}

const Field = forwardRef(({ id, name, label, className, icon, placeholder, disabled, defaultValue, tip, error, onChange, onBlur, type = "text" }: Input, ref: ForwardedRef<HTMLInputElement>) => {



    return <Fragment>
        <div className={cn(style.field)}>

            {label && <label className={cn(style.field__label, "label")} htmlFor={id}>{label}</label>}
            <div className={cn(style.field__input, { [style.error]: error }, { "pr-1": icon }, className)}>
                <input
                    ref={ref}
                    name={name || id}
                    defaultValue={defaultValue}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className={style.type_text}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur} />
                {icon}
            </div>
            {
                error &&
                <span className={cn(style.field__error)}>
                    {error.message}
                </span>
            }
        </div>
    </Fragment >
})

export default Field