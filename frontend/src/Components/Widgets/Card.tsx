import { Fragment } from "react";
import { MdOutlineStar, MdOutlineStarBorder, MdPerson4 } from 'react-icons/md'
import StripTag from "./stripTag.widget";
import cn from 'classnames'
import style from '../../Styles/card.module.sass'
import { CardContent } from "../../types";

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
                        {
                            isFavorite ?
                                <MdOutlineStar color="#F9C53F" />
                                :
                                <MdOutlineStarBorder color="#00000099" />
                        }
                    </span>
                    <p className={cn(style.card__tags)}>
                        <StripTag size="small" text={ticket.id} url={ticket.url} />
                        <StripTag size="small" text="Spreadsheet Data" url={spreadsheetURL} variant="teal" />
                    </p>
                </div>
                <img src={image} alt={name} />

            </div>
            <div className={cn(style.card__meta)}>
                <p className={cn(style.name)}>{name}</p>
                <p className={cn(style.author)}><MdPerson4 /> {author}</p>
            </div>

        </div>
    </Fragment>
}