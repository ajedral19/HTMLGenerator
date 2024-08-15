import { useEffect, useState } from 'react'
import { Option } from '../types'

export default function useOptionFilter(text: string, data?: Option[]) {
    const [filtered, setFiltered] = useState<Option[] | null>([])

    useEffect(() => {
        let itemFound: Option[] = []
        data?.forEach((item: Option) => {
            const item_name = item.name?.toLowerCase().split(' ').join('')
            const search = text?.toLowerCase().split(' ').join('')
            if (item_name.includes(search))
                itemFound = [...itemFound, item]

            setFiltered(itemFound)
        })
    }, [data, text])


    return filtered?.length ? filtered : data
}