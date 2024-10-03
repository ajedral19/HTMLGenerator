import { Fragment } from "react";
import { MdPerson4 } from 'react-icons/md'
import StripTag from "./StripTag";
import cn from 'classnames'
import { CardContent } from "../../types";
import Favotite from "./favorite.widget";

import global_style from '../../Styles/global.module.sass'
import style from '../../Styles/card.module.sass'

export default function Card({ data }: CardContent) {
    const { id, name, author, ticket, spreadsheetURL, isFavorite, image } = data

    const revealDetails = (id: string) => {
        console.log(id);
    }

    return <Fragment>
        <div className={cn(style.card)} onClick={() => revealDetails(id)}>
            <div className={cn(style.card__body)}>
                <div className={cn(style.card__body__overlay)}>
                    <span role="button" className={cn(style.favorite)}>
                        <Favotite isFavorite={isFavorite} />
                    </span>
                    <p className={cn(style.card__tags)}>
                        {
                            Array.isArray(ticket) ?
                                ticket.map((item, key) =>
                                    <StripTag size="small" text={item.id} url={item.url} key={key} />
                                ) :
                                <StripTag size="small" text={ticket.id} url={ticket.url} />
                        }
                        <StripTag size="small" text="Spreadsheet Data" url={spreadsheetURL} variant="teal" />
                    </p>
                </div>
                <img src={image} alt={name} />

            </div>
            <div className={cn(style.card__meta)}>
                <p className={cn(style.name)}>{name}</p>
                <p className={cn(global_style.icon_text)}><MdPerson4 fontSize="1.6rem" /> {author}</p>
            </div>

        </div>
    </Fragment>
}