import { useQuery } from "@tanstack/react-query";
// import { io } from "socket.io-client";
import { GetTemplates } from "../Utils/RequestHander";

// const socket = io("http://localhost:9100/")
export default function useGetTemplates() {

    const { data: templates, isLoading } = useQuery({
        queryFn: () => GetTemplates(),
        queryKey: ["templates"],
    })

    return { templates, isLoading }

}