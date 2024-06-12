import { Fragment } from "react/jsx-runtime";

type card = {
    id: string,
    template_name: string,
    document_template_url: string
}
export default function Card({ id, template_name, document_template_url }: card) {
    return <Fragment>
        <div className="card" data-template-id={id} >
            <div className="card__img-wrap">
                <img src="./images/template-placeholder.png" alt="textbook name" />
            </div>
            <div className="card__body">
                <h4 className="title title--5 card__title">{template_name}</h4>
                <a href={document_template_url} className="link link--external" target="__blank">Check document template</a>
            </div>
        </div>
    </Fragment>
}