import { Fragment, ReactElement } from "react";
import { useForm } from "react-hook-form";
import cn from 'classnames'
import Field from "./field.widget";
import style from '../../Styles/search_field.module.sass'

type SearchField = {
    icon?: ReactElement
    placeholder?: string
    className?: string
    pattern?: RegExp
    invalidInputMsg?: string
    onSubmit: (data: { headerField: string; }) => void
}

// const pattern = /docs\.google\.com\/spreadsheets\/d\/\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]){44}/
export default function SearchField({ icon, placeholder, className, pattern, invalidInputMsg, onSubmit }: SearchField) {

    const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({ mode: "onSubmit", defaultValues: { headerField: "" } })

    // const onSubmit = (e) => {
    //     console.log(errors);
    // }

    return <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field
                {...register("headerField", {
                    pattern: pattern ? {
                        value: pattern,
                        message: invalidInputMsg || "Invalid input"
                    } : undefined,
                    onChange: () => clearErrors()
                })}

                id="headerField"
                className={cn(style.search_field, className)}
                placeholder={placeholder}
                icon={icon}
            />
            {errors?.headerField && <blockquote>{errors?.headerField.message}</blockquote>}
        </form>
    </Fragment>
}