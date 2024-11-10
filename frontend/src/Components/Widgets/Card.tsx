import { Fragment, useEffect, useState } from "react";
import { MdPerson4 } from 'react-icons/md'
import StripTag from "./StripTag";
import cn from 'classnames'
import { CardContent, TemplateDetails } from "../../types";
import Favotite from "./favorite.widget";

import global_style from '../../Styles/global.module.sass'
import style from '../../Styles/card.module.sass'
import { useDispatch, useSelector } from "react-redux";
import { useImage } from "../../Hooks/useImage";
import { BiExpandAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { showSidePane } from "../../Redux/Slices/sidePane";
import { RootState } from "../../store";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { TemplateArchiveOne } from "../../Handlers/HandleTemplate";

type state = {
    active?: boolean,
    isFav?: boolean
}

export default function Card({ data, layout = "grid" }: CardContent & { onClick?: () => void, layout?: "grid" | "list" }) {
    const { id, name, author, ticket, spreadsheetURL, image } = data
    const [state, setState] = useState<state>({})
    const { current, favorites } = useSelector((state: RootState) => ({ current: state.sidePane.details.data.id, favorites: state.templatesState.favorites }))
    const myImg = useImage(image) || "/images/template-placeholder.png"
    const dispatch = useDispatch()

    useEffect(() => {
        if (current == id)
            setState(state => ({ ...state, active: true }))
        else
            setState(state => ({ ...state, active: false }))
    }, [current])

    const getDetailsOnClick = (details: TemplateDetails) =>
        dispatch(showSidePane({ isVisible: true, visibleState: "themeDetails", details: { ...details, data: { ...details.data, isFavorite: favorites.includes(id) } } }))

    return <Fragment>
        <div className={cn(style.card, style[layout], { [style.focused]: state.active })} onClick={() => getDetailsOnClick({ data: { id, name, author, ticket, spreadsheetURL, isFavorite: data.isFavorite, image, stylesheets: [], uploadDate: "" } })}>

            <div className={cn(style.card__img)}>
                {state?.active &&
                    <Link to={`/api/template/${id}/preview`} target="_blank" rel="noopener noreferrer">
                        <BiExpandAlt className={style.expand} />
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
                    <Favotite id={id} fontSize="2rem" />
                </span>
                {
                    state.active &&
                    <span role="button" onClick={() => { TemplateArchiveOne(id, !data.is_archived) }}>
                        <HiMiniArchiveBoxXMark fontSize='2rem' />
                    </span>
                }
            </div>

        </div>
    </Fragment>
}