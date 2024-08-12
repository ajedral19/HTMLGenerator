import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GetTemplates } from "../Utils/RequestHander";
import { Option } from "../types";

const socket = io('http://localhost:9100')

export default function useGetTemplates(): Option[] {
    const [templates, setTemplates] = useState<Option[]>([])
    // const preload = useLoaderData()

    useEffect(() => {
        socket.on('get_templates', ({ data: rows }) => setTemplates(() => rows))
        // socket.on('get_templates', ({ data: rows }) => console.log(rows))
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        GetTemplates(signal).then(({ data: rows }) => setTemplates(rows))

        return () => controller.abort()

    }, [])

    return templates
}