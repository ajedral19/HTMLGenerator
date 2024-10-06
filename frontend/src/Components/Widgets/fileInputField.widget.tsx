import { DragEventHandler, EventHandler, ForwardedRef, forwardRef, Fragment, useEffect, useRef, useState } from "react"
import cn from 'classnames'
import style from '../../Styles/fileInputField.module.sass'
import Button from "./button.widget"
import { MdHtml } from "react-icons/md"
import { PiFileHtml } from "react-icons/pi"
import { useForm } from "react-hook-form"

type FileInput = {
    id?: string
    name?: string
    file?: FileList
    onDragOver?: DragEventHandler
    onDragEnter?: DragEventHandler
    onDrop?: DragEventHandler
    onClick?: (e: React.SyntheticEvent) => void
}

const FileInputField = forwardRef(({ id, name, file, onDragOver, onDragEnter, onDrop, onClick }: FileInput, ref: ForwardedRef<HTMLInputElement>) => {


    return <Fragment>
        <div className={cn(style.file_field)} onDragOver={onDragOver} onDragEnter={onDragEnter} onDrop={onDrop} onClick={onClick}>
            {file?.length ? <>
                <PiFileHtml fontSize="8rem" />
                <span>{file[0].name}</span>
            </> : null
            }
            <label>Browse or drag an HTML file here</label>
            <input id={id} name={name} ref={ref} type="file" aria-hidden="true" />
        </div>
    </Fragment>
})

export default FileInputField