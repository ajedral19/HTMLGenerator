import { Fragment, ReactElement, useEffect, useState } from "react";
import Field from "./Widgets/field.widget";
import cn from 'classnames'
import style from '../Styles/header.module.sass'
import { LuSearch } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Button } from "./Widgets";
import { MdAdd, MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { headerOptions } from "../Redux/Slices/header";
import { useLocation, matchRoutes } from "react-router-dom";
import { showSidePane } from "../Redux/Slices/sidePane";
import { PiTreeStructureFill } from "react-icons/pi";
import { init_details } from "../Utils/initialStates";
import { DocumentExtract } from "../Handlers/HandleDocument";
import useExtract from "../Hooks/useExtract";

import SearchField from "./Widgets/search_field.widget";
import { spreadsheetUrl } from "../Redux/Slices/spreadsheetUrl";

type state = {
    hasTemplates: boolean
    isFiddle: boolean
    showTemplateForm: boolean,
    navigation?: {
        text?: string
        rtl?: boolean
        icon?: ReactElement
        fn?: () => void
        href?: string
    },
    textField?: {
        placeholder?: string
        isValid?: boolean
        url?: string
    }
}

// sheet id only -> /([-a-zA-Z0-9()@:%_\+.~#?&\=]){44}/
// sheet url -> /docs\.google\.com\/spreadsheets\/d\/\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]){44}/
const pattern = /docs\.google\.com\/spreadsheets\/d\/\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]){44}/

export default function Header() {
    const dispatch = useDispatch()
    const currentRoute = useLocation()

    const [state, setState] = useState<state>({
        hasTemplates: false,
        isFiddle: false,
        showTemplateForm: false
    })

    const sidePane = useSelector((state: { sidePane: { visibleState?: "newThemeForm" | "themeDetails", isVisible: boolean } }) => state.sidePane)
    const { visibleState, isVisible } = sidePane
    const isGrid = useSelector((state: { headerOptions: { display: { isGrid: boolean } } }) => state.headerOptions.display.isGrid)

    const handleDisplay = (state: boolean) =>
        dispatch(headerOptions({ display: { isGrid: state } }))

    const handleShowSidePane = () =>
        dispatch(showSidePane({ isVisible: true, details: init_details, visibleState: "newThemeForm" }))

    const handleCloseSidePane = () =>
        dispatch(showSidePane({ isVisible: false, visibleState: undefined }))

    const isRouteMatch = (path: string) => matchRoutes([{ path }], currentRoute) ? true : false

    useEffect(() => {
        setState((state: state) => ({
            ...state,
            navigation: {
                ...state.navigation,
                text: isRouteMatch('/templates') ? "Template Fiddle" : "Templates",
                rtl: isRouteMatch('/templates'),
                icon: isRouteMatch('/templates') ? <MdArrowForward fontSize="2rem" /> : <MdArrowBack fontSize="2rem" />,
                href: isRouteMatch('/templates') ? "/templates/fiddle" : "/templates"
            },
            textField: {
                ...state.textField,
                placeholder: isRouteMatch('/templates') ? "Looking for a template? Find by typing here"
                    : "Enter a Spreadsheet URL or ID",
                isValid: false
            }
        }))

    }, [currentRoute])

    useEffect(() => {
        if (isVisible && visibleState === 'newThemeForm')
            setState(state => ({ ...state, showTemplateForm: true }))
        else
            setState(state => ({ ...state, showTemplateForm: false }))
    }, [isVisible, visibleState])

    const handleSubmit = (e: { headerField: string }) => {
        if (!isRouteMatch('/templates')) {
            dispatch(spreadsheetUrl(e.headerField))
        }
    }


    return <Fragment>
        <div className={cn(style.header)}>
            {
                isRouteMatch('/templates') &&
                <div className={cn(style.display_layout_options)}>
                    <Button icon={<BsGrid3X3GapFill />} className={cn({ ["transparent"]: !isGrid })} onClick={() => handleDisplay(true)} />
                    <Button icon={<FaThList />} className={cn({ ["transparent"]: isGrid })} onClick={() => handleDisplay(false)} />
                </div>
            }
            <SearchField
                onSubmit={handleSubmit}
                placeholder={!isRouteMatch('/templates') ? "enter spreadsheet url to extract" : "find a template"}
                pattern={!isRouteMatch('/templates') ? pattern : undefined}
                invalidInputMsg={!isRouteMatch('/templates') ? "invalid url" : undefined}
                icon={isRouteMatch('/templates') ?
                    <LuSearch
                        role="button"
                        cursor="pointer"
                        fontSize="2rem"
                    /> :
                    <PiTreeStructureFill
                        role="button"
                        cursor="pointer"
                        fontSize="2rem"
                    />}
            />
            {
                isRouteMatch('/templates') &&
                <Button
                    icon={state.showTemplateForm ? <MdClose fontSize="2rem" /> : <MdAdd fontSize="2rem" />}
                    className="mr-auto"
                    onClick={state.showTemplateForm ? handleCloseSidePane : handleShowSidePane} />
            }
            <Button
                text={state.navigation?.text}
                icon={state.navigation?.icon}
                rtl={state.navigation?.rtl}
                onClick={state.navigation?.fn}
                href={state.navigation?.href}
                className="ml-auto"
            />
        </div>
    </Fragment>
}