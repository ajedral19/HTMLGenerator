import { useEffect, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md"
import { Fragment } from "react/jsx-runtime"
import { isGeneratorFunction } from "util/types";
import { storeName } from "../../Utils/initialStates";
import { useSelector } from "react-redux";

type Favotite = {
    id: string
    isFavorite: boolean
    fontSize?: string
};

export default function Favotite({ id, isFavorite, fontSize }: Favotite) {
    const [isFav, setIsFav] = useState<boolean>()
    const { favorites } = useSelector((state: { templatesState: { favorites: string[] } }) => state.templatesState)

    useEffect(() => {
        const favorite = favorites.find(item => item === id)
        setIsFav(favorite ? true : false)
    }, [favorites])

    return <Fragment>
        <i role="button" >
            {
                isFav ?
                    <MdOutlineStar cursor="pointer" color="#F9C53F" fontSize={fontSize} />
                    :
                    <MdOutlineStarBorder cursor="pointer" color="#ffffff90" fontSize={fontSize} />
            }
        </i>

    </Fragment >
}