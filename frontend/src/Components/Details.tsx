import { Fragment } from "react";
import cn from 'classnames'
import style from '../Styles/details.module.sass'
import StripTag from "./Widgets/stripTag.widget";
import { MdOutlineStar, MdPerson4 } from "react-icons/md";

export default function Details() {
    return <Fragment>
        <div className={cn(style.details)}>
            <ul className={cn(style.details__tabs)}>
                <li role="button">
                    Details
                </li>
                <li role="button">
                    Activity
                </li>
            </ul>

            <img src="/images/template-placeholder.png" alt="Awesome Template" />

            <div className={cn(style.details__meta)}>
                <div className="flex items-center space-between pb-1">
                    <StripTag text="TK-123" url="example.com" />
                    <MdOutlineStar color="#F9C53F" fontSize="2.4rem" />
                </div>
                <div>
                    <h4>Awesome Template</h4>
                    <p className={cn(style.author)}><MdPerson4 /> Jane Doe</p>
                </div>

                <div>
                    <p className="label">Date uploaded</p>
                    <p>September 17, 2024</p>
                </div>

                <div>
                    <p className="label">Spreadsheet URL</p>
                    <p>
                        <a href="example.com">
                            https://docs.google.com/spreadsheets/d/1RwTPIFQSaO6yrTR2g-auHENnr1JMFYbTfQGA4iMF12w/edit?gid=0#gid=0
                        </a>
                    </p>
                </div>

                <div>
                    <p className="label">Stylesheet in use</p>
                    <ul>
                        <li>
                            <a href="exmaple.com">stylessheet.css</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Fragment>
}