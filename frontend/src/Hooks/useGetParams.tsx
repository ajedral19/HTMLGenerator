import { useSearchParams } from "react-router-dom"

export default function useGetParams() {
    const [searchParams] = useSearchParams()

    const params = searchParams.toString().split('&')
    let queries = {}
    params.map((val) => {
        const [key, value] = val.split('=')
        queries = { ...queries, [key]: value }
        return queries
    })

    return queries
}