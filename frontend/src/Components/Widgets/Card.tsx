import React, { Fragment, useEffect, useState } from "react";
import { MdPerson4 } from 'react-icons/md'
import StripTag from "./StripTag";
import cn from 'classnames'
import { CardContent, TemplateDetails } from "../../types";
import Favotite from "./favorite.widget";

import global_style from '../../Styles/global.module.sass'
import style from '../../Styles/card.module.sass'
import { useSelector } from "react-redux";
import { useImage } from "../../Hooks/useImage";
import { BiExpandAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getFromIndexStore } from "../../Utils/IndexedDB";

type state = {
    active?: boolean,
    isFav?: boolean
}

export default function Card({ data, onClick, layout = "grid" }: CardContent & { onClick?: () => void, layout?: "grid" | "list" }) {
    const { id, name, author, ticket, spreadsheetURL, isFavorite, image } = data
    const [state, setState] = useState<state>({})

    const current = useSelector((state: { sidePane: { details?: TemplateDetails } }) => state.sidePane.details?.data.id)

    const myImg = useImage(image) || "/images/template-placeholder.png"

    const [archive, setArchive] = useState()
    // getFromIndexStore(data.id, setArchive)

    // useEffect(() => {
    //     console.log(archive);
    // }, [])

    useEffect(() => {
        if (current == id)
            setState(state => ({ ...state, active: true }))
        else
            setState(state => ({ ...state, active: false }))
    }, [current])

    const expandTemplate = (e: React.SyntheticEvent, id: string) => {
        e.stopPropagation()
        // navigate(`api/template/${id}/preview`)
        // do request
    }


    return <Fragment>
        <div className={cn(style.card, style[layout], { [style.focused]: state.active })} onClick={onClick}>

            <div className={cn(style.card__img)}>
                {state?.active &&
                    <Link to={`/api/template/${id}/preview`} target="_blank" rel="noopener noreferrer">
                        <BiExpandAlt className={style.expand} onClick={(e) => expandTemplate(e, id)} />
                    </Link>
                }
                <img src={myImg?.toString()} alt={name} />
            </div>

            <div className={cn(style.card__meta)}>
                <div className={cn(style.info)}>
                    <p className={cn(style.name)}>{name}</p>
                    {author && <p className={cn(global_style.icon_text, style.author)}><MdPerson4 fontSize="1.6rem" /> {author}</p>}
                </div>
                {
                    (ticket || spreadsheetURL) &&
                    <p className={cn(style.tags)}>
                        {
                            ticket && (
                                Array.isArray(ticket) ?
                                    ticket.map((item, key) =>
                                        <StripTag size="small" text={item.id} url={item.url} key={key} />
                                    ) :
                                    <StripTag size="small" text={ticket.id} url={ticket.url} />
                            )
                        }
                        <StripTag size="small" text="Spreadsheet Data" url={spreadsheetURL} variant="teal" />
                    </p>
                }

                <span role="button" className={cn(style.favorite)}>
                    <Favotite id={id} isFavorite={isFavorite} fontSize="2rem" />
                </span>
            </div>

        </div>
    </Fragment>
}