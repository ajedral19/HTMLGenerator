import { Fragment } from "react";
import cn from 'classnames'
import StripTag from "./Widgets/StripTag";
import { Md10K, MdAdd, MdOutlineSportsHockey, MdOutlineStar, MdOutlineStarBorder, MdPerson4 } from "react-icons/md";
import { TemplateData, TemplateDetails } from "../types";
import { Button } from "./Widgets";
import Favotite from "./Widgets/favorite.widget";

import global_style from '../Styles/global.module.sass'
import style from '../Styles/details.module.sass'



export default function Details({ data }: TemplateDetails) {
    const { id, name, author, ticket, spreadsheetURL, isFavorite, image, stylesheets, uploadDate } = data
    return <Fragment>
        <section className={cn(style.details)}>
            <ul className={cn(style.details__tabs)}>
                <li role="button">
                    Details
                </li>
                <li role="button">
                    Activity
                </li>
            </ul>

            <img src={image} alt={name} />
            <div className={cn(style.details__content)}>
                <div className={cn(style.details__meta)}>
                    <div className="flex items-center space-between no-gap mb-1">
                        {
                            Array.isArray(ticket) ?
                                ticket.map((item, key) => (
                                    <StripTag text={item.id} url={item.url} key={key} />
                                ))
                                :
                                <StripTag text={ticket.id} url={ticket.url} />
                        }
                        <Favotite isFavorite={isFavorite} fontSize="2.4rem" />
                    </div>
                    <div>
                        <h4>{name}</h4>
                        <p className={cn(global_style.icon_text)}><MdPerson4 fontSize="1.6rem" /> {author}</p>
                    </div>

                    <div>
                        <p className="label">Date uploaded</p>
                        <p>{uploadDate}</p>
                    </div>

                    <div>
                        <p className="label">Spreadsheet URL</p>
                        <p>
                            <a href="example.com">
                                {spreadsheetURL}
                            </a>
                        </p>
                    </div>

                    <div>
                        <p className="label">Stylesheet in use</p>
                        <ul>
                            {
                                Array.isArray(stylesheets) ?
                                    stylesheets.map((style, key) => (
                                        <li key={key}>
                                            <a href={style.url}>{style.name}</a>
                                        </li>

                                    )) :
                                    <li >
                                        <a href={stylesheets.url}>{stylesheets.name}</a>
                                    </li>
                            }
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <Button text="Generate" />
                        <Button icon={<MdOutlineStar />} text="test" />
                        <Button icon={<MdAdd fontSize="2rem" />} />
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
}