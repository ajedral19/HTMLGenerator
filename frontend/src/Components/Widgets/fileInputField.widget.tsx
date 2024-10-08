import { DragEventHandler, EventHandler, ForwardedRef, forwardRef, Fragment, useEffect, useRef, useState } from "react"
import cn from 'classnames'
import style from '../../Styles/fileInputField.module.sass'
import Button from "./button.widget"
import { MdHtml } from "react-icons/md"
import { PiFileHtml } from "react-icons/pi"
import { useForm } from "react-hook-form"
import { FaFileUpload } from "react-icons/fa"
import { BiSolidCloudUpload } from "react-icons/bi"

type FileInput = {
    id?: string
    name?: string
    className?: string
    // file?: FileList
    // onDragOver?: DragEventHandler
    // onDragEnter?: DragEventHandler
    // onDrop?: DragEventHandler
    // onClick?: (e: React.SyntheticEvent) => void
}

const FileInputField = forwardRef(({ id, name, className }: FileInput, ref: ForwardedRef<HTMLInputElement>) => {

    const fileinput = useRef(null)

    const handleDrag = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
    }

    // TODO handle input file
    const handlefiles = (files: FileList, max: number = 2) => {
        const { length } = files
        console.log(files, length);

    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        handlefiles(e.dataTransfer.files)
        e.preventDefault()
    }

    return <Fragment>

        {/* onDragOver={onDragOver} onDragEnter={onDragEnter} onDrop={onDrop} onClick={onClick} */}
        <label className={cn(style.drop_area, className)} htmlFor={id} onDragOver={handleDrag} onDragEnter={handleDrag} onDrop={handleDrop} >
            <input
                id={id}
                name={name || id}
                ref={ref}
                type="file"
                accept="text/html, text/htm"
                multiple
                hidden />
            <div className={cn(style.drop_area__block)}>
                <BiSolidCloudUpload fontSize="4em" className="mt-auto" />
                <p className="mb-auto">Drag and drop or click here<br />to upload html file</p>
                <span className="block">
                    Upload template from your computer.
                    {/* <br />Accepts maximum of 2 files */}
                </span>
            </div>
        </label>
    </Fragment>
})

export default FileInputField