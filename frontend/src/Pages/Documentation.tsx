import { Fragment } from "react/jsx-runtime";
import NestedList from "../Components/Widgets/NestedList";
import cn from 'classnames'
import style from '../Styles/documentation.module.sass'
import { Link } from "react-router-dom";
import { RiLinkM } from "react-icons/ri";

const list = [
    {
        slug: "introduction",
        title: "Introduction"
    },
    {
        slug: "getting-started",
        title: "Getting Started",
        sub: [{ slug: "tutorial", title: "Tutorial" }]
    },
    {
        slug: "template-creation",
        title: "Template Createtion",
        sub: [
            { slug: "syntax", title: "Syntax" },
            { slug: "spreadsheet", title: "Spreadsheet" },
            {
                slug: "helpers",
                title: "Helpers",
                sub: [
                    { slug: "loud", title: "loud" },
                    { slug: "blank", title: "blank" },
                    { slug: "person", title: "person" },
                ]
            },
            { slug: "contribute", title: "Contribute" },
        ]
    },
    { slug: "how-to-use", title: "How to use" },
]

export default function Documentation() {
    return <Fragment>
        <main className={cn(style.documentation)}>
            <aside className={cn(style.documentation__pane, style.documentation__aside)}>
                <div className={cn(style.content)}>

                    <NestedList list={list} />
                </div>
            </aside>
            <section className={cn(style.documentation__pane, style.documentation__view)}>
                <h2 className="title title--1"><Link to="#">Introduction <RiLinkM className={cn(style.link)} /></Link></h2>
                <p className="mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem adipisci sit fugit ut. Explicabo minima officiis quae deleniti, maiores, quidem sequi quas minus commodi itaque quod atque ea perspiciatis sit laudantium magni, error blanditiis ullam eos? Eius aliquam debitis sapiente enim eveniet necessitatibus architecto impedit fugiat ratione eum sit deleniti pariatur, dicta rerum unde autem dolores aperiam officia deserunt corporis?</p>
            </section>
            <aside className={cn(style.documentation__pane, style.documentation__navigation)}>
                <ul>
                    <li>
                        <Link to="#">Lorem, ipsum.</Link>
                    </li>
                    <li>
                        <Link to="#">Lorem ipsum dolor sit.</Link>
                    </li>
                    <li>
                        <Link to="#">Lorem, ipsum dolor.</Link>
                    </li>
                </ul>
            </aside>
        </main>
    </Fragment>
}