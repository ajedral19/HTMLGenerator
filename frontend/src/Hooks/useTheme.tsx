import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cacheTheme } from "../Utils/CacheingAndStorage";


// const randomByte = Math.floor(Math.random() * (90 - 65 + 1) + 64)
// console.log(String.fromCharCode(randomByte), randomByte);

const getCurrTheme = (isDark: boolean): { theme: "dark" | "light" } => {
    let storage: string | null = localStorage.getItem("html-app")

    if (!storage) {
        localStorage.setItem("html-app", JSON.stringify({ theme: isDark ? "dark" : "light" }))
        storage = localStorage.getItem("html-app")
    }

    return storage ? JSON.parse(storage) : { theme: "light" }
}


// const getRanges = (charCodes: number[][]) => charCodes[Math.floor((Math.random() * charCodes.length))]
// const generateCode = (limit: number) => {
//     const charCodes = [[65, 90], [97, 122], [48, 57], [33, 33], [36, 36]]
//     let repeat = 0
//     const randomBytes = Array.from(Array(limit), (_, n) => {
//         const i = n
//         const [min, max] = getRanges(charCodes)
//         n = Math.floor(Math.random() * (max - min + 1) + min)

//         return String.fromCharCode(n)
//     })
//     return randomBytes.join('');
// }

// const code = generateCode(8)
// console.log(code);
export default function useTheme(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const isMatchesDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const { theme } = getCurrTheme(isMatchesDark)
    const [isDark, setIsDark] = useState<boolean>(theme === "dark" ? true : false)

    useEffect(() => {
        const swtichTheme = isDark ? "dark" : "light"
        document.documentElement.setAttribute('app-theme', swtichTheme)
        localStorage.setItem('html-app', JSON.stringify({ theme: swtichTheme }))
    }, [isDark])

    return [isDark, setIsDark]
}