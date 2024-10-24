import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime"
import { templatesState } from "../../Redux/Slices/templatesState";
import { useEffect, useState } from "react";

type Favotite = {
    id: string
    fontSize?: string
    isFavorite?: boolean
    onClick?: () => void
};

export default function Favotite({ id, fontSize, isFavorite = false }: Favotite) {
    const favorites = useSelector((state: { templatesState: { favorites: string[] } }) => state.templatesState.favorites)
    const [isFav, setIsFav] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleFavorite = (e: React.SyntheticEvent, id: string) => {
        e.stopPropagation()
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([id]))
            dispatch(templatesState({ favorites: [id] }))
            return
        } else {
            const store = localStorage.getItem('favorites') || '[]'
            const storedItems: string[] = JSON.parse(store)

            if (storedItems.includes(id)) {
                const newStoredItems = storedItems.filter((item: string) => item !== id)
                localStorage.setItem('favorites', JSON.stringify(newStoredItems))
                dispatch(templatesState({ favorites: newStoredItems }))
            } else {
                const newStoredItems = [...storedItems, id]
                localStorage.setItem('favorites', JSON.stringify(newStoredItems))
                dispatch(templatesState({ favorites: newStoredItems }))
            }
        }
    }

    useEffect(() => {
        if (favorites.includes(id)) {
            setIsFav(true)
        } else {
            setIsFav(false)
        }

    }, [favorites])

    useEffect(() => {
        if (localStorage.getItem('favorites')) {
            const store = localStorage.getItem('favorites') || '[]'
            const storedItems: string[] = JSON.parse(store)
            if (storedItems.includes(id)) {
                setIsFav(true)
            } else {
                setIsFav(false)
            }
        }
    }, [])

    return <Fragment>
        <i role="button" onClick={(e) => handleFavorite(e, id)} >
            {
                isFav ?
                    <MdOutlineStar cursor="pointer" color="#F9C53F" fontSize={fontSize} />
                    :
                    <MdOutlineStarBorder cursor="pointer" color="#ffffff90" fontSize={fontSize} />
            }
        </i>

    </Fragment >
}