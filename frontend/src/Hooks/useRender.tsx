import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store"

type Render = {
    isRendering: boolean,
    render: string,
}

export const useRender = (code) => {
    const [state, setState] = useState<Render>({ isRendering: false, render: "" })
    const { data } = useSelector((state: RootState) => state.jsonData)
    useEffect(() => {

    }, [data, code])

    return { render: state.render, isRendering: state.isRendering }
}