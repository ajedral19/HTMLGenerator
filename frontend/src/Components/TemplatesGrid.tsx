import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSidePane } from "../Redux/Slices/sidePane";
import { TemplateDetails } from "../types";
import { Card } from "./Widgets";
import cn from 'classnames'

const TemplatesGrid = ({ data }: { data?: TemplateDetails[] }) => {
    const dispatch = useDispatch()
    const { isGrid, isVisible } = useSelector((state: { headerOptions: { display: { isGrid: boolean } }, sidePane: { isVisible: boolean } }) => ({ isGrid: state.headerOptions.display.isGrid, isVisible: state.sidePane.isVisible }))

    const getDetailsOnClick = (details: TemplateDetails) =>
        dispatch(showSidePane({ isVisible: true, visibleState: "themeDetails", details: details }))

    console.log(isVisible);


    return <Fragment>
        <div className="flex">
            {
                data &&
                    data.length ?
                    data.map((template: TemplateDetails, key: number) => (
                        <div className={cn("col", isGrid ? isVisible ? "col-3" : "col-2" : "col-4")} key={key}>
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