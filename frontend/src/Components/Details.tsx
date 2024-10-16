import { Fragment, useEffect, useReducer, useState } from "react";
import cn from 'classnames'
import StripTag from "./Widgets/StripTag";
import { MdArchive, MdEdit, MdMoreHoriz, MdPerson4 } from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import { TemplateDetails } from "../types";
import { Button } from "./Widgets";
import Favotite from "./Widgets/favorite.widget";

import global_style from '../Styles/global.module.sass'
import style from '../Styles/details.module.sass'
import { Link } from "react-router-dom";
import Field from "./Widgets/field.widget";
import { useImage } from "../Hooks/useImage";
import { useForm } from "react-hook-form";
import { CacheHTMLGenerate, HTMLGenerate } from "../Handlers/HandleHTML";
import fileDownload from "js-file-download";
import { indexStore } from "../Utils/IndexedDB";

const editButton = [
    {
        icon: <MdEdit />,
        title: "Edit"
    },
    {
        icon: <MdArchive />,
        title: "Archive",
    },
    {
        icon: <FaShare />,
        title: "share",
    },
]

type state = {
    status: "Generate" | "Submit" | "Download",
    isLoading: boolean,
    file?: [ArrayBuffer, string]
}

export default function Details({ data }: TemplateDetails) {
    const { name, author, ticket, spreadsheetURL, isFavorite, image, stylesheets, uploadDate } = data
    const { register, getValues, reset } = useForm({ defaultValues: { offset: "1", limit: "10" } })
    const [state, setState] = useState<state>({
        status: "Generate",
        isLoading: false,
        file: undefined
    })

    const myImg = useImage(image)

    const handleGenerate = () => {
        setState((state) => ({ ...state, isLoading: true }))
        const { offset, limit } = getValues()
        const { spreadsheetURL, id } = data
        HTMLGenerate(id, spreadsheetURL, parseInt(offset), parseInt(limit))
            .then(response => {
                if (response) {
                    const attachment = response.headers['content-disposition'].split(';')[1]
                    if (attachment) {
                        const attachment = response.headers['content-disposition'].split(';')[1]
                        setState((state) => ({
                            ...state,
                            isLoading: false,
                            status: "Download",
                            file: [response.data, attachment]
                        }))
                        // indexStore(id)
                    }
                }
            }).catch(err => console.log(err))
    }

    const handleDownload = () => {
        if (state.file) {
            const [file, attachment] = state.file
            fileDownload(file, attachment)
        }
    }

    const handleOnClick = () => {
        switch (state.status) {
            case "Submit":
                handleGenerate()
                return
            case "Download":
                handleDownload()
                return
            default:
                setState((state) => ({ ...state, status: "Submit" }))
        }
        // setGenerate(true)
    }

    useEffect(() => {
        setState((state) => ({
            ...state,
            status: "Generate",
            isLoading: false,
            file: undefined
        }))
    }, [data])

    return <Fragment>
        <section className={cn(style.details)}>
            <img src={myImg?.toString()} alt={name} />
            <ul className={cn(style.details__tabs)}>
                <li role="button">
                    Details
                </li>
                <li role="button">
                    Activity
                </li>
            </ul>
            <div className={cn(style.details__content)}>
                <div className={cn(style.details__meta)}>
                    <div className="flex items-center space-between no-gap mb-1">
                        {

                            ticket ?
                                Array.isArray(ticket) ?
                                    ticket.map((item, key) => (
                                        <StripTag text={item.id} url={item.url} key={key} />
                                    ))
                                    :
                                    <StripTag text={ticket.id} url={ticket.url} />
                                : null
                        }
                        <Favotite isFavorite={isFavorite} fontSize="2.4rem" />
                    </div>
                    <div>
                        <h4 className={cn("title title--2")}>{name}</h4>
                        {author && <p className={cn(global_style.icon_text)}><MdPerson4 fontSize="1.6rem" /> {author}</p>}
                    </div>

                    {
                        uploadDate &&
                        <div>
                            <p className="label">Date uploaded</p>
                            <p>{uploadDate}</p>
                        </div>
                    }

                    {spreadsheetURL &&
                        <div>
                            <p className="label">Spreadsheet URL</p>
                            <p>
                                <Link to={spreadsheetURL} target="_blank">
                                    {spreadsheetURL}
                                </Link>
                            </p>
                        </div>
                    }

                    {
                        stylesheets &&
                        <div>
                            <p className="label">Stylesheet in use</p>
                            <ul>
                                {
                                    Array.isArray(stylesheets) ?
                                        stylesheets.map((style, key) => (
                                            style &&
                                            <li key={key}>
                                                <Link to={style.url || ""} target="_blank">
                                                    {style.name || ""}
                                                </Link>
                                            </li>

                                        )) :
                                        <li >
                                            <Link to={stylesheets.url || ""} target="_blank">
                                                {stylesheets.name || ""}
                                            </Link>
                                        </li>
                                }
                            </ul>
                        </div>
                    }
                    {/* <GenerateForm spreadsheet={spreadsheetURL} /> */}
                    {
                        state.status == "Submit" &&
                        <div className="flex">
                            <Field className={cn("col col-6", style.input_offset)} defaultValue="1" min={1} {...register("offset")} type="number" label="Offset" />
                            <Field className={cn("col col-6", style.input_limit)} defaultValue="1" min={1} max={60} {...register("limit")} type="number" label="Limit" />
                            {state.isLoading && "loading..."}
                        </div>
                    }
                    <div className="mt-auto no-gap flex">
                        <Button className="mr-auto" text={state.status} onClick={handleOnClick} disabled={state.isLoading} />
                        <Button className="" icon={<MdMoreHoriz />} title="More" options={editButton} />
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
}