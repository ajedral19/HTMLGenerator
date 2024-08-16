import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Option } from "../../types";
import { GetTemplate, ViewTemplate } from "../../Utils/RequestHander";

export default function TemplatePreview() {
    const data = useSelector((state: { modal: { data: Option } }) => state.modal.data)


    return (
        <Fragment>
            <div>
                <div className="preview-wrap">
                    <p>{data.name}</p>
                    <a href={data.sheet}>Sheet URL</a>
                    {
                        data?.mockup ?
                            <div dangerouslySetInnerHTML={{ __html: data?.mockup || "" }}></div>
                            :
                            <p>No mockup is loaded</p>
                    }
                </div>
            </div>
        </Fragment>
    )
}