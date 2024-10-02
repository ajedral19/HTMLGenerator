import { Fragment } from "react/jsx-runtime";
// import useGetParams from "../Hooks/useGetParams";
import { Card } from "../Components/Widgets";

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
        <Card data={card} />
    </Fragment>
}