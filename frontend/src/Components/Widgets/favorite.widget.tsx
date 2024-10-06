import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md"
import { Fragment } from "react/jsx-runtime"

type Favotite = {
    isFavorite: boolean;
    fontSize?: string;
    onClick?: (...args: any[]) => void;
};

export default function Favotite({ isFavorite, fontSize, onClick }: Favotite) {
    return <Fragment>
        <i role="button" onClick={onClick}>
            {
                isFavorite ?
                    <MdOutlineStar cursor="pointer" color="#F9C53F" fontSize={fontSize} />
                    :
                    <MdOutlineStarBorder cursor="pointer" color="#ffffff90" fontSize={fontSize} />
            }
        </i>

    </Fragment >
}