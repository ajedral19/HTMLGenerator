import { DragEventHandler, EventHandler, ForwardedRef, forwardRef, Fragment, useEffect, useRef, useState } from "react"
import cn from 'classnames'
import style from '../../Styles/fileInputField.module.sass'
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import { BiSolidCloudUpload } from "react-icons/bi"

type FileInput = {
    id?: string
    name?: string
    className?: string
    error?: FieldError
    // file?: FileList
    onDragOver?: DragEventHandler
    onDragEnter?: DragEventHandler
    onDrop?: DragEventHandler
    onClick?: (e: React.SyntheticEvent) => void
    onChange?: (e: React.SyntheticEvent) => void
}

const FileInputField = forwardRef(({ id, name, className, error, onDragOver, onDragEnter, onDrop, onChange }: FileInput, ref: ForwardedRef<HTMLInputElement>) => {
    const handleDrag = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
    }

    return <Fragment>

        {/* onDragOver={onDragOver} onDragEnter={onDragEnter} onDrop={onDrop} onClick={onClick} */}
        <label className={cn(style.drop_area, className)} htmlFor={id} onDragOver={handleDrag} onDragEnter={handleDrag} onDrop={onDrop} >
            <input
                {...ref}
                id={id}
                name={name || id}
                // ref={{ref}}
                type="file"
                accept="text/html, text/htm"
                onChange={onChange}
                // multiple
                hidden />
            <div className={cn(style.drop_area__block)}>
                <BiSolidCloudUpload fontSize="4em" className="mt-auto" />
                <p className="mb-auto">Drag and drop or click here<br />to upload html file</p>
                <span className="block">
                    Upload template from your computer.
                    <br />Accepts maximum of 2 files
                </span>
                {
                    error &&
                    <span className="block">
                        {error.message}
                    </span>
                }
            </div>
        </label>
    </Fragment>
})

export default FileInputField