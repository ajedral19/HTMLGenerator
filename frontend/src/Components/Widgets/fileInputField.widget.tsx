import { DragEventHandler, ForwardedRef, forwardRef, Fragment } from "react"
import cn from 'classnames'
import style from '../../Styles/fileInputField.module.sass'
import { FieldError } from "react-hook-form"
import { BiSolidCloudUpload } from "react-icons/bi"

type FileInput = {
    id?: string
    name?: string
    className?: string
    error?: FieldError
    onDragOver?: DragEventHandler
    onDragEnter?: DragEventHandler
    onDrop?: DragEventHandler
    onClick?: (e: React.SyntheticEvent) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInputField = forwardRef(({ id, name, className, error, onDragOver, onDragEnter, onDrop, onChange }: FileInput, ref: ForwardedRef<HTMLInputElement | null>) => {
    const handleDragDrop = (e: React.DragEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
    }

    return <Fragment>
        <label
            className={cn(style.drop_area, className)}
            htmlFor={id}
            onDragOver={onDragOver || handleDragDrop}
            onDragEnter={onDragEnter || handleDragDrop}
            onDrop={onDrop} >
            <input
                ref={ref}
                id={id}
                name={name || id}
                type="file"
                accept="text/html, text/htm"
                onChange={onChange}
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