import { DragEventHandler, EventHandler, ForwardedRef, forwardRef, Fragment, useEffect, useRef, useState } from "react"
import cn from 'classnames'
import style from '../../Styles/fileInputField.module.sass'
import Button from "./button.widget"
import { MdHtml } from "react-icons/md"
import { PiFileHtml } from "react-icons/pi"
import { useForm } from "react-hook-form"
import { FaFileUpload } from "react-icons/fa"

type FileInput = {
    id?: string
    name?: string
    // file?: FileList
    // onDragOver?: DragEventHandler
    // onDragEnter?: DragEventHandler
    // onDrop?: DragEventHandler
    // onClick?: (e: React.SyntheticEvent) => void
}

const FileInputField = forwardRef(({ id, name }: FileInput, ref: ForwardedRef<HTMLInputElement>) => {

    const fileinput = useRef(null)

    const handleDrag = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        const data = e.dataTransfer.files
        console.log(data, 'from input field');
        

        e.preventDefault()
    }

    return <Fragment>

        {/* onDragOver={onDragOver} onDragEnter={onDragEnter} onDrop={onDrop} onClick={onClick} */}
        <label className={cn(style.drop_area)} htmlFor={id} onDragOver={handleDrag} onDragEnter={handleDrag} onDrop={handleDrop} >
            <input
                id={id}
                name={name || id}
                ref={ref}
                type="file"
                accept="text/html, text/htm"
                hidden />
            <div className={cn(style)}>
                <FaFileUpload />
                <p>Drag and drop or click here to upload html file</p>
                <span>upload an html format template from your computer.</span>
            </div>
        </label>
    </Fragment>
})

export default FileInputField