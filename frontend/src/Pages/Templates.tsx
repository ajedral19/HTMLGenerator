import { Fragment } from "react/jsx-runtime";
// import useGetParams from "../Hooks/useGetParams";
import { Card } from "../Components/Widgets";
import Details from "../Components/Details";
import { TemplateData, TemplateDetails } from "../types";
import { url } from "inspector";

const date = new Date()


const card = {
    id: "1234",
    name: "The awesome dude",
    author: "Jane Doe",
    ticket: {
        id: "TK-1234",
        url: "wwww.example.com"
    },
    spreadsheetURL: "wwww.example.com",
    isFavorite: false,
    image: '/images/template-placeholder.png'
}

const details = {
    ...card,
    stylesheets:
        [
            {
                name: "stylesheet.css",
                url: "example.com/stylesheet.css"
            },
        ]
    ,
    uploadDate: date.toLocaleString()
}

export default function Templates() {

    return <Fragment>
        <div className="grid">
            <div className="grid-item">
                <Card data={card} />
            </div>
            <div className="grid-item">
                <Details data={details} />
            </div>

        </div>
    </Fragment>
}