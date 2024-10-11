import { useEffect, useState } from "react"
import { Buffer } from 'buffer'

export const useImage = (image: Buffer | string) => {

    const [img, setImg] = useState<ArrayBuffer | string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        if (typeof image === 'string') return setImg(image)
        const reader = new FileReader()
        const buffer = Buffer.from(image)
        const blob = new Blob([buffer])

        reader.addEventListener('load', () => {
            const render = new Image()
            render.height = 1200
            render.title = ""
            setImg(reader.result)
        }, controller)

        reader.readAsDataURL(blob)



        return () => controller.abort()
    }, [image])

    console.log(typeof img);
    return img
}