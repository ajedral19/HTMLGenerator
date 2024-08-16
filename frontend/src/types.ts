import { SetStateAction } from "react"

export type Option = {
    id: string,
    name: string,
    template?: string,
    mockup?:string,
    sheet: string,
    screenshot?: string,
}

export type FieldInput = {
    label: string,
    name: string,
    id: string,
    type?: 'select'
    options?: Option[],
    onChange?: (e: Target) => void,
}

export type Target = {
    target: { value: SetStateAction<string> }
}
