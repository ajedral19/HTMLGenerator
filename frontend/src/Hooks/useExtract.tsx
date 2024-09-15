import { useQuery } from "@tanstack/react-query"
import { GetJSONData } from "../Handlers/RequestHander"

export default function useExtract(url: string) {

    const { data, isLoading } = useQuery({
        queryFn: async () => await GetJSONData(url),
        queryKey: ["jsonData", url]
    })
    return { data, isLoading }
}