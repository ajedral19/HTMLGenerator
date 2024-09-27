import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"
import { S3Fetch } from "../Handlers/HandleS3"
export default function useS3Objects() {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryFn: () => S3Fetch(),
        queryKey: ['bucketObjects']
    })

    const { mutateAsync: MutateBucket, isPending } = useMutation({
        mutationFn: S3Fetch,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bucketObjects'] })
    })


    return { data, isLoading, MutateBucket, isPending }
}