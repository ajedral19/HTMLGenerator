import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from 'classnames'
import style from '../../Styles/global.module.sass'
import { MdArrowDropDown } from "react-icons/md";

type ListItem = {
    slug: string
    title: string
    sub?: ListItem[]
}

type List = {
    list: ListItem[]
}

export default function NestedList({ list, slug }: List & { slug?: string }) {
    const location = useLocation()

    const handleOnClick = (selection: string) => {
        console.log(location);

    }

    return <Fragment>
        <ul className={cn(style.nested_list)}>
            {
                list.map((item, i) => (
                    <Fragment>
                        <li className={cn(style.nested_list__item)} key={i} onClick={() => handleOnClick(item.slug)}>
                            <p>
                                <Link to={slug ? slug + '/' + item.slug : item.slug} className="mr-1">
                                    {item.title}
                                </Link>
                            </p>
                            {
                                item?.sub ? <NestedList list={item.sub} slug={item.slug} />
                                    : null
                            }
                        </li>
                    </Fragment>

                ))
            }
        </ul>
    </Fragment>
}