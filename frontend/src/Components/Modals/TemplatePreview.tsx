import { Fragment } from "react";

export default function TemplatePreview({ html }: { html?: string }) {
    console.log('test');

    return (
        <Fragment>
            <div>
                <div dangerouslySetInnerHTML={{ __html: html || "<h1>Hello testing</h1>" }}></div>
                <p>Hello testing</p>
            </div>
        </Fragment>
    )
}