import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { io } from "socket.io-client";

import { useEffect } from "react";
import useGetParams from "./useGetParams";
import { TemplateFindAll } from "../Handlers/HandleTemplate";

// const socket = io("http://localhost:9100/")
export default function useGetTemplates() {
    const queryClient = useQueryClient()
    const { page }: { page?: string } = useGetParams()


    // const { data: templates, isLoading } = useQuery({
    //     queryFn: () => GetTemplates(page),
    //     queryKey: ["templates"],
    // })

    const { mutateAsync: MutateTemplate, isPending } = useMutation({
        mutationFn: TemplateFindAll,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['templates'] })
    })

    useEffect(() => {
        if (page)
            MutateTemplate(parseInt(page))

    }, [page])


    return { isPending, MutateTemplate }

}