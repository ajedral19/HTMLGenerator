import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { io } from "socket.io-client";
import { GetTemplates } from "../Handlers/RequestHander";
import { useEffect } from "react";
import useGetParams from "./useGetParams";

// const socket = io("http://localhost:9100/")
export default function useGetTemplates() {
    const queryClient = useQueryClient()
    const { page }: { page?: string } = useGetParams()

    // const { data: templates, isLoading } = useQuery({
    //     queryFn: () => GetTemplates(page),
    //     queryKey: ["templates"],
    // })

    const { mutateAsync: MutateTemplate, isPending } = useMutation({
        mutationFn: GetTemplates,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['templates'] })
    })

    useEffect(() => {
        MutateTemplate(page)
    }, [page])


    return { isPending, MutateTemplate }

}