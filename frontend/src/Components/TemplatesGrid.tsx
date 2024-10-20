import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSidePane } from "../Redux/Slices/sidePane";
import { TemplateDetails } from "../types";
import { Card } from "./Widgets";
import cn from 'classnames'
import { storeName } from "../Utils/initialStates";

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
    const [favorites, setFavorites] = useState<string[]>([])
    const dispatch = useDispatch()
    const { isGrid, isVisible } = useSelector((state: state) => ({
        isGrid: state.headerOptions.display.isGrid,
        isVisible: state.sidePane.isVisible,
    }))

    useEffect(() => {
        const favsList = localStorage.getItem(storeName.favorites)
        if (favsList) {
            const favsListArr = JSON.parse(favsList)
            setFavorites(favsListArr)
        }
    }, [data])

    const getDetailsOnClick = (details: TemplateDetails) =>
        dispatch(showSidePane({ isVisible: true, visibleState: "themeDetails", details: { ...details, data: { ...details.data, isFavorite: favorites.includes(details.data.id) } } }))

    return <Fragment>
        <div className="flex">
            {
                data &&
                    data.length ?
                    data.map((template: TemplateDetails, key: number) => (
                        <div className={cn("col", isGrid ? isVisible ? "col-3" : "col-3" : "col-4")} key={key}>
                            <Card data={{ ...template.data, isFavorite: favorites.includes(template.data.id) }} onClick={() => getDetailsOnClick(template)} layout={isGrid ? "grid" : "list"} />
                        </div>
                    ))
                    :
                    null
            }
        </div>
    </Fragment>
}

export default TemplatesGrid