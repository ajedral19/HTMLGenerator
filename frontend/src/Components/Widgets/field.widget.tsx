import { Fragment } from "react/jsx-runtime";
import { ForwardedRef, forwardRef } from "react";
import cn from 'classnames'
import style from '../../Styles/field.module.sass'
import { ChangeHandler, FieldError } from "react-hook-form";

type Input = {
    id?: string
    name?: string
    label?: string
    className?: string
    placeholder?: string
    type?: "text" | "number"
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
        <div className={cn(style.field, className)}>

            {label && <label className={cn(style.field__label)} htmlFor={id}>{label}</label>}
            <div className={cn(style.field__input, { [style[type]]: type }, { [style.error]: error }, { "pr-1": icon })}>
                <input
                    min={type == 'number' ? 1 : undefined}
                    max={type == 'number' ? 60 : undefined}
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