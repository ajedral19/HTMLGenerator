import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GetTemplates } from "../Utils/RequestHander";
import { Option, TemplateData } from "../types";
import { useDispatch } from "react-redux";
import { getTemplates } from "../Redux/Slices/templates";

const socket = io("http://localhost:9100/")

export default function useGetTemplates(): Option[] {
    const [templates, setTemplates] = useState<TemplateData[]>([])
    const dispatch = useDispatch()
    // const preload = useLoaderData()

    useEffect(() => {
        socket.on('get_templates', ({ rows, rowCount }) => {
            setTemplates(rows)
            dispatch(getTemplates({ rows, rowCount }))
        })
        // socket.on('get_templates', ({ data: rows }) => console.log(rows))
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        GetTemplates(signal).then(({ rows, rowCount }) => {
            setTemplates(rows)
            dispatch(getTemplates({ rows, rowCount }))
        })

        return () => controller.abort()

    }, [])

    return templates
}