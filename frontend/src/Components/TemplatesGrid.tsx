import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSidePane } from "../Redux/Slices/sidePane";
import { TemplateDetails } from "../types";
import { Card } from "./Widgets";
import cn from 'classnames'

const TemplatesGrid = ({ data }: { data?: TemplateDetails[] }) => {
    const dispatch = useDispatch()
    const isGrid = useSelector((state: { headerOptions: { display: { isGrid: boolean } } }) => state.headerOptions.display.isGrid)

    const getDetailsOnClick = (details: TemplateDetails) =>
        dispatch(showSidePane({ isVisible: true, visibleState: "themeDetails", details: details }))

    return <Fragment>
        <div className="flex">
            {
                data &&
                    data.length ?
                    data.map((template: TemplateDetails, key: number) => (
                        <div className={cn("col", isGrid ? "col-3" : "col-12")} key={key}>
                            <Card data={template.data} onClick={() => getDetailsOnClick(template)} layout={isGrid ? "grid" : "list"} />
                        </div>
                    ))
                    :
                    null
            }
        </div>
    </Fragment>
}

export default TemplatesGrid