import { useQuery } from "@tanstack/react-query"
import { DocumentExtract } from "../Handlers/HandleDocument"

export default function useExtract(url: string) {

    const { data, isLoading } = useQuery({
        queryFn: async () => await DocumentExtract(url),
        queryKey: ["jsonData", url],
        refetchOnWindowFocus: false,
    })
    return { data, isLoading }
}