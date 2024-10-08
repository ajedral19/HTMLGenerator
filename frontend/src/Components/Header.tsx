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
        icon?: ReactElement
    }
}

export default function Header() {
    const currentRoute = useLocation()
    const [state, setState] = useState<state>({
        hasTemplates: false,
        isFiddle: false,
        showTemplateForm: false
    })

    const sidePane = useSelector((state: { sidePane: { visibleState?: "newThemeForm" | "themeDetails", isVisible: boolean } }) => state.sidePane)
    const { visibleState, isVisible } = sidePane


    const { register } = useForm<{ headerField: string }>({ defaultValues: { headerField: "" } })
    const isGrid = useSelector((state: { headerOptions: { display: { isGrid: boolean } } }) => state.headerOptions.display.isGrid)
    const dispatch = useDispatch()

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
                icon: isRouteMatch('/templates') ?
                    <LuSearch cursor="pointer" fontSize="2rem" color="#3A466C" />
                    : <PiTreeStructureFill cursor="pointer" fontSize="2rem" color="#3A466C" />
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
            <Field
                {...register("headerField")}
                id="finder"
                className={cn(style.search_field)}
                placeholder={state.textField?.placeholder}
                icon={state.textField?.icon}
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