import { useQuery } from "@tanstack/react-query"
import { S3Fetch } from "../Handlers/HandleS3"
export default function useS3Objects() {
    // const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryFn: () => S3Fetch(),
        queryKey: ['bucketObjects']
    })


    return { data, isLoading }
}