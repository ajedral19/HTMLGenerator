import { Fragment, useEffect, useState } from "react";
import cn from 'classnames'
import StripTag from "./Widgets/StripTag";
import { MdArchive, MdClose, MdEdit, MdMoreHoriz, MdPerson4 } from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import { TemplateDetails } from "../types";
import { Button } from "./Widgets";
import Favotite from "./Widgets/favorite.widget";

import global_style from '../Styles/global.module.sass'
import style from '../Styles/details.module.sass'
import { useDispatch } from "react-redux";
import { showSidePane } from "../Redux/Slices/sidePane";
import { init_details } from "../Utils/initialStates";
import { Link } from "react-router-dom";
import Field from "./Widgets/field.widget";
import { Buffer } from 'buffer'
import { useImage } from "../Hooks/useImage";
import GenerateForm from "./Form/GenerateForm";

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

export default function Details({ data }: TemplateDetails) {
    const { name, author, ticket, spreadsheetURL, isFavorite, image, stylesheets, uploadDate } = data

    const myImg = useImage(image)

    const handleGenerate = (payload: { spreadsheet: string, offset: number, iteration: number }) => {
        console.log(payload);

    }

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
                    <GenerateForm spreadsheet={spreadsheetURL} />
                    <div className="mt-auto no-gap flex">
                        <Button className="mr-auto" text="Generate" onClick={() => handleGenerate({ spreadsheet: spreadsheetURL, offset: 1, iteration: 1 })} />
                        <Button className="" icon={<MdMoreHoriz />} title="More" options={editButton} />
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
}