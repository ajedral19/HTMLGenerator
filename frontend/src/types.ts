import { SetStateAction } from "react"

export type Option = {
    _id: string,
    template_name: string,
    template_document: string,
    template_screenshot?: string,
}

export type FieldInput = {
    label: string,
    name: string,
    id: string,
    type?: 'select'
    options?: Option[],
    onChange?: (e: Target) => void
}

export type Target = {
    target: { value: SetStateAction<string> }
}
