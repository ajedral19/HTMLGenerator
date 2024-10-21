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

export default function Favotite({ id, isFavorite, fontSize }: Favotite) {
    return <Fragment>
        <i role="button" >
            {
                isFavorite ?
                    <MdOutlineStar cursor="pointer" color="#F9C53F" fontSize={fontSize} />
                    :
                    <MdOutlineStarBorder cursor="pointer" color="#ffffff90" fontSize={fontSize} />
            }
        </i>

    </Fragment >
}