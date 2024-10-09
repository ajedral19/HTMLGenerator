import { Fragment, useEffect, useRef, useState } from "react";
import Field from "../Widgets/field.widget";
import { Button } from "../Widgets";
import cn from 'classnames'
import style from '../../Styles/templateForm.module.sass'
import { MdClose } from "react-icons/md";
import FileInputField from "../Widgets/fileInputField.widget";
import { useForm } from "react-hook-form";

const spreadsheet_pattern = /docs\.google\.com\/spreadsheets\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const cdn_pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi

export default function TemplateForm() {
    const { register, watch, setValue, setFocus, getValues, formState: { errors }, handleSubmit } = useForm()

    // const { ref, ...rest } = register('file', { required: "Upload your HTML template file." })


    // TODO handle input file
    const handlefiles = (files: FileList, max: number = 2) => {
        const { length } = files
        // console.log(fileFIeld.current?.value)
        console.log(files, length, 'handlefiles');
    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        console.log(e.dataTransfer.files);
        setValue('files', e.dataTransfer.files)

        e.preventDefault()
    }

    const onSubmit = () => {
        const values = getValues()
        console.log(values);
    }
    return <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(style.template_form)}>
                <FileInputField
                    {...register('files', { required: "need some files to upload" })}
                    className="mb-1"
                    onDrop={handleDrop}
                // error={errors?.file}
                />
                <Field
                    {
                    ...register("templateName",
                        {
                            required: "Template name is required.",
                        })
                    }
                    id="templateName"
                    label="Template Name"
                    error={errors?.templateName}
                />
                <Field
                    {
                    ...register("spreadsheetURL",
                        {
                            required: "Spreadsheet URL is required.",
                            pattern: {
                                value: spreadsheet_pattern,
                                message: "You have enterned an invalid URL"
                            }
                        })
                    }
                    id="spreadsheetURL"
                    label="Enter a spreadsheet URL or choose from the existine ones"
                    error={errors?.spreadsheetURL}
                />
                <Field
                    {
                    ...register("cdn",
                        {
                            pattern: {
                                value: cdn_pattern,
                                message: "You have enterned an invalid URL"
                            }
                        })
                    }
                    id="cdn"
                    label="Enter a CDN URL or choose from the existine ones"
                    error={errors?.cdn}
                />
                <div className={cn(style.template_form__btns, "pt-1")}>
                    <Button type="submit" text="Store" />
                    <Button type="reset" icon={<MdClose />} title="Clear" />
                </div>
            </div>
        </form>
    </Fragment>
}