import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GetTemplates } from "../Utils/RequestHander";
import { Option } from "../types";
import { useDispatch } from "react-redux";
import { getTemplates } from "../Redux/Slices/templates";

const socket = io("http://localhost:9100/")

export default function useGetTemplates(): Option[] {
    const [templates, setTemplates] = useState<Option[]>([])
    const dispatch = useDispatch()
    // const preload = useLoaderData()

    useEffect(() => {
        socket.on('get_templates', ({ data: rows }) => {
            setTemplates(() => rows.templates)
            dispatch(getTemplates({ data: rows.templates }))
        })
        // socket.on('get_templates', ({ data: rows }) => console.log(rows))
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        GetTemplates(signal).then(({ data: rows }) => {
            setTemplates(rows.templates)
            dispatch(getTemplates({ data: rows.templates }))
        })

        return () => controller.abort()

    }, [])

    return templates
}