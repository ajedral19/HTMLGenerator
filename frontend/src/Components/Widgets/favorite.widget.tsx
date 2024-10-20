import { useEffect, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md"
import { Fragment } from "react/jsx-runtime"
import { isGeneratorFunction } from "util/types";
import { storeName } from "../../Utils/initialStates";

type Favotite = {
    id: string
    isFavorite: boolean
    fontSize?: string
};

type state = {
    isFav?: boolean
}

export default function Favotite({ id, isFavorite, fontSize }: Favotite) {
    const [state, setState] = useState<state>({ isFav: isFavorite })

    const handleStore = () => {
        const store = storeName.favorites
        if (!localStorage.getItem(store)) {
            localStorage.setItem(store, JSON.stringify([]))
        } else { }

        const favorites = localStorage.getItem(store) || "[]"
        const parsed = JSON.parse(favorites)
        // console.log(parsed.indexOf(id));

        // return
        if (!(parsed.indexOf(id) >= 0)) {
            localStorage.setItem(store, JSON.stringify([...parsed, id]))
        } else {
            const filtered = parsed.filter((fav: string) => fav !== id)
            localStorage.setItem(store, JSON.stringify(filtered))
        }
    }

    const handleFavorite = (e) => {
        e.stopPropagation()
        setState((state) => ({ ...state, isFav: !state.isFav }))
        handleStore()
    }

    useEffect(() => {
        setState((state) => ({ ...state, isFav: isFavorite }))
    }, [isFavorite])

    return <Fragment>
        <i role="button" onClick={handleFavorite}>
            {
                state.isFav ?
                    <MdOutlineStar cursor="pointer" color="#F9C53F" fontSize={fontSize} />
                    :
                    <MdOutlineStarBorder cursor="pointer" color="#ffffff90" fontSize={fontSize} />
            }
        </i>

    </Fragment >
}