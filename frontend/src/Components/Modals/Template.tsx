import { Fragment } from "react/jsx-runtime"
import Button from "../Widgets/button.widget"
import Input from "../Form/Input"
import FileUpload from "../Form/File"
import { useDispatch } from "react-redux"
import { showModal } from "../../Redux/Slices/modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { TemplateSave } from "../../Handlers/HandleTemplate"



export default function Template() {
    const queryClient = useQueryClient()

    const { mutateAsync: SaveTemplateMutate, isPending } = useMutation({
        mutationFn: TemplateSave,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["templates"] })
        },

    })


    const dispatch = useDispatch()
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            template_file: { files: Blob[] },
            template_name: { value: string, dataset: string },
            document_template_url: { value: string, dataset: string },
            template_resource_cdn: { value: string, dataset: string }

        }
        const file = target.template_file.files[0]
        const template_name = target.template_name.value
        const document_template = target.document_template_url.value
        const resource_cdn = target.template_resource_cdn.value


        // const base64 = await readFileDataAsBase64(file)

        // while saving
        await SaveTemplateMutate({ template: file, name: template_name, sheet: document_template, cdn: resource_cdn })
        // loading... genarating template mock and screenshot

        // then
        // clear -> close modal 
        // dispatch(showModal({ show: false }))

    }

    return (
        <Fragment>
            <div className="template-modal">
                <form action="" onSubmit={handleSubmit}>
                    <FileUpload name="template-file" />
                    <div className="form pr-2 pl-2 pb-2">
                        <div className="fields">

                            {/* <input type="file" name="template-file" id="template_file" /> */}
                            <Input label="Template Name" name='template_name' id='template_name' />
                            <Input label="Document Template URL" name='document_template_url' id='document_template_url' />

                            <div className="fields mt-2">
                                <blockquote className="mb-1">Choose stylesheet and add cdn to inject. (only applies to screenshot and preview generation)</blockquote>
                                <Input label="Select Stylesheet (WIP)" type="select" name="stylesheet_cdn" id="stylesheet_cdn" disabled />
                                <Input label="Enter a CDN" name='template_resource_cdn' id='template_resource_cdn' />
                                e.g. https://nativecamp-public-web-production.s3-ap-northeast-1.amazonaws.com/

                            </div>
                        </div>
                        <div className="commands">
                            <Button type="submit" text='Submit' id='save_template' variant='primary' />
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}