import { Fragment, useEffect, useRef, useState } from "react";
import Field from "../Widgets/field.widget";
import { Button } from "../Widgets";
import cn from 'classnames'
import style from '../../Styles/templateForm.module.sass'
import { MdClose } from "react-icons/md";
import FileInputField from "../Widgets/fileInputField.widget";
import { useForm } from "react-hook-form";

export default function TemplateForm() {
    const { register, watch, setValue, setFocus } = useForm()


    const handleDrag = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        const data = e.dataTransfer.files
        setValue("file", data)
        e.preventDefault()
    }
7
    return <Fragment>
        <form>
            <div className={cn(style.template_form)}>
                <FileInputField {...register('file')} onDragOver={handleDrag} onDragEnter={handleDrag} onDrop={handleDrop} />
                <Field {...register("templateName")} id="templateName" label="Template Name" />
                <Field {...register("spreadsheetURL")} id="spreadsheetURL" label="Enter a spreadsheet URL or choose from the existine ones" />
                <Field {...register("cdn")} id="cdn" label="Enter a CDN URL or choose from the existine ones" />
                <div className={cn(style.template_form__btns, "pt-1")}>
                    <Button type="submit" text="Store" />
                    <Button type="reset" icon={<MdClose />} title="Clear" />
                </div>
            </div>
        </form>
    </Fragment>
}