import { Fragment } from "react"
import cn from 'classnames'
import style from '../../Styles/global.module.sass'
import { FieldValues, useForm } from "react-hook-form"
import Field from "../Widgets/field.widget"
import { Button } from "../Widgets"

export default function GenerateForm({ spreadsheet, className }: { spreadsheet: string, className?: string }) {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: FieldValues, url: string) => {
        const { offset, iteration } = data
        console.log(offset, iteration, url);

    }

    return <Fragment>
        <div className={cn(style.generate_form, className)}>
            <form onSubmit={handleSubmit((e) => onSubmit(e, spreadsheet))} >
                <div className="flex">
                    <Field className={cn("col col-6", style.input_offset)} defaultValue="1" min={1} {...register("offset")} type="number" label="Offset" />
                    <Field className={cn("col col-6", style.input_iteration)} defaultValue="1" min={1} max={60} {...register("iteration")} type="number" label="Iteration" />

                    <div className="col col-12">
                        <Button className={cn("w-full", style.btn_submit)} type="submit" text="Submit" />
                    </div>
                </div>
                <div className={cn(style.form_grid)}>

                    {/* <Button className={cn(style.btn_cancel)} type="button" text="Cancel" /> */}
                </div>
            </form>
        </div>
    </Fragment>
}