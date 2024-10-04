import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md"
import { Fragment } from "react/jsx-runtime"
import { Favotite } from "../../types"

export default function Favotite({ isFavorite, fontSize, onClick }: Favotite) {
    return <Fragment>
        <i role="button" onClick={onClick}>
            {
                isFavorite ?
                    <MdOutlineStar color="#F9C53F" fontSize={fontSize} />
                    :
                    <MdOutlineStarBorder color="#ffffff90" fontSize={fontSize} />
            }
        </i>

    </Fragment >
}