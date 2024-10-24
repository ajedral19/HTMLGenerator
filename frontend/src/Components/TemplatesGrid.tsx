import { Fragment } from "react";
import { useSelector } from "react-redux";
import { TemplateDetails } from "../types";
import { Card } from "./Widgets";
import cn from 'classnames'

type state = {
    headerOptions: {
        display: {
            isGrid: boolean
        }
    },
    sidePane: {
        isVisible: boolean
    }
}

const TemplatesGrid = ({ data }: { data?: TemplateDetails[] }) => {
    const { isGrid, isVisible } = useSelector((state: state) => ({
        isGrid: state.headerOptions.display.isGrid,
        isVisible: state.sidePane.isVisible,
    }))

    return <Fragment>
        <div className="flex">
            {
                data &&
                    data.length ?
                    data.map((template: TemplateDetails, key: number) => (
                        <div className={cn("col", isGrid ? isVisible ? "col-3" : "col-3" : "col-4")} key={key}>
                            <Card data={{ ...template.data }} layout={isGrid ? "grid" : "list"} />
                        </div>
                    ))
                    :
                    null
            }
        </div>
    </Fragment>
}

export default TemplatesGrid