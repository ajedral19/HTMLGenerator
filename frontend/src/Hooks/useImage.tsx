import { useEffect, useState } from "react"
import { Buffer } from 'buffer'

export const useImage = (image: Buffer | string | null) => {

    const [img, setImg] = useState<ArrayBuffer | string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        if (image) {
            if (typeof image === 'string') return setImg(image)
            const buffer = Buffer.from(image)
            const blob = new Blob([buffer])
            const url = URL.createObjectURL(blob.slice(0, blob.size, "image/webp"))
            setImg(url)
        }

        return () => controller.abort()
    }, [image])

    return img
}