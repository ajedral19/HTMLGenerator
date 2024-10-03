import { Fragment } from "react/jsx-runtime";
// import useGetParams from "../Hooks/useGetParams";
import { Card } from "../Components/Widgets";
import Details from "../Components/Details";

const card = {
    id: "1234",
    name: "The awesome dude",
    author: "Jane Doe",
    ticket: {
        id: "TK-1234",
        url: "wwww.example.com"
    },
    spreadsheetURL: "wwww.example.com",
    isFavorite: true,
    image: '/images/template-placeholder.png'
}

export default function Templates() {

    return <Fragment>
        <div className="grid">
            <div className="grid-item">
                <Card data={card} />
            </div>
            <div className="grid-item">
                <Details />
            </div>

        </div>
    </Fragment>
}