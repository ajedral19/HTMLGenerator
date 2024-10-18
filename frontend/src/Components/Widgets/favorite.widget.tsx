import { useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md"
import { Fragment } from "react/jsx-runtime"

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

    const handleFavorite = () => {
        setState((state) => ({ ...state, isFav: !state.isFav }))
    }

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