import { io } from "socket.io-client";
import { GetTemplates } from "../Utils/RequestHander";
import { useQuery } from "@tanstack/react-query";

const socket = io("http://localhost:9100/")

export default function useGetTemplates() {

    const { isPending, error, data } = useQuery({
        queryKey: ['templatesData'],
        queryFn: () => GetTemplates(),

    })

    return { isPending, error, data }
}