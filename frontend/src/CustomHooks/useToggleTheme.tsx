import { useEffect, useState } from "react";

type Theme = "light" | "dark" | null

export default function useToggleTheme(_theme?: Theme) {
    const [theme, setTheme] = useState<Theme>(null)
    const [state, setState] = useState<boolean>(false)


    useEffect(() => {
        if (!state) {
            if (!_theme) {
                const sys_dark = window.matchMedia("(prefers-color-scheme: dark)")
                if (sys_dark.matches)
                    setTheme('dark')
                else
                    setTheme('light')
            } else {
                setTheme(_theme)
            }
        }

        return () => {
            setState(true)
            document.querySelector('html')?.setAttribute('data-theme', theme || 'light')
        }
    }, [state, theme, _theme])

    return theme
}