import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Option } from "../../types";
import DOMPurify from "dompurify";
import { bufferToString } from "../../Utils/FileHandlers";

type ModalData = {
    name: string,
    sheet: string,
    mockup: { buffer: Blob }
}

export default function TemplatePreview() {
    const data = useSelector((state: { modal: { data: ModalData } }) => state.modal.data)
    // let html = data?.mockup || ""
    // html = html.toString().replace(/%/g, '~~pct~~');
    // html = html.toString('utf-8')

    let html = bufferToString(data.mockup.buffer)

    return (
        <Fragment>
            <div>
                <div className="preview-wrap">
                    <p>{data.name}</p>
                    <a href={data.sheet}>Sheet URL</a>
                    {
                        data?.mockup ?
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html, { IN_PLACE: true, FORBID_TAGS: ['style', 'script'] }) }}></div>
                            :
                            <p>No mockup is loaded</p>
                    }
                </div>
            </div>
        </Fragment>
    )
}