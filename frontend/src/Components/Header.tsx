import { Fragment, ReactElement, useEffect, useState } from "react";
import cn from 'classnames'
import style from '../Styles/header.module.sass'
import { LuSearch } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Button } from "./Widgets";
import { MdAdd, MdArrowBack, MdArrowForward, MdClose, MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { headerOptions } from "../Redux/Slices/header";
import { useLocation, matchRoutes } from "react-router-dom";
import { showSidePane } from "../Redux/Slices/sidePane";
import { PiTreeStructureFill } from "react-icons/pi";
import { init_details } from "../Utils/initialStates";

import SearchField from "./Widgets/search_field.widget";
import { spreadsheetUrl } from "../Redux/Slices/spreadsheetUrl";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type state = {
    hasTemplates: boolean
    isFiddle: boolean
    showTemplateForm: boolean,
    isFetching: boolean,
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
        value?: string
    }
}

// sheet id only -> /([-a-zA-Z0-9()@:%_\+.~#?&\=]){44}/
// sheet url -> /docs\.google\.com\/spreadsheets\/d\/\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]){44}/
const pattern = /docs\.google\.com\/spreadsheets\/d\/\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]){44}/

export default function Header() {
    const dispatch = useDispatch()
    const currentRoute = useLocation()
    const queryClient = useQueryClient()

    const [state, setState] = useState<state>({
        hasTemplates: false,
        isFiddle: false,
        showTemplateForm: false,
        isFetching: false
    })

    const { register, watch, getFieldState } = useForm()

    useEffect(() => {
        console.log(watch('toggle_archive'))
    }, [watch('toogle_archive')])

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

    const handleRefesh = () => {
        if (!isRouteMatch('/templates')) {
            if (!queryClient.isFetching({ queryKey: ['jsonData'] })) {
                queryClient.invalidateQueries({ queryKey: ["jsonData"] })
            }
        }
        else {
            if (!queryClient.isFetching({ queryKey: ['templates'] })) {
                queryClient.invalidateQueries({ queryKey: ['templates'] })
            }
        }
    }

    const handleSubmit = (e: { headerField: string }) => {
        if (!isRouteMatch('/templates')) {
            dispatch(spreadsheetUrl({ url: e.headerField }))
        }
    }

    // ANCHOR useEffects
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
            <Button
                icon={<MdRefresh fontSize="2rem" />}
                title="Refresh"
                onClick={handleRefesh}
                disabled={state.isFetching} />
            {
                isRouteMatch('/templates') &&
                <>
                    <p className="checkbox">
                        <input {...register("toggle_archive")} type="checkbox" name="toggle_archive" id="toggle_archive" aria-hidden="true" hidden />
                        <label htmlFor="toggle_archive">Show Archives</label>
                    </p>
                    <Button
                        icon={state.showTemplateForm ? <MdClose fontSize="2rem" /> : <MdAdd fontSize="2rem" />}
                        className="ml-auto"
                        onClick={state.showTemplateForm ? handleCloseSidePane : handleShowSidePane} />
                </>
            }
            <Button
                text={state.navigation?.text}
                icon={state.navigation?.icon}
                rtl={state.navigation?.rtl}
                onClick={state.navigation?.fn}
                href={state.navigation?.href}
                className={cn(!isRouteMatch('/templates') && "ml-auto")}
            />
        </div>
    </Fragment>
}