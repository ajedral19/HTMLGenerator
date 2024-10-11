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
        isValid?: boolean
    }
}

const pattern = /docs\.google\.com\/spreadsheets\/d\/\b([-a-zA-Z0-9()@:%_\+.~#?&//=]\/*)/

export default function Header() {
    const currentRoute = useLocation()
    const [state, setState] = useState<state>({
        hasTemplates: false,
        isFiddle: false,
        showTemplateForm: false
    })

    const { register, getValues, handleSubmit } = useForm<{ headerField: string }>({ defaultValues: { headerField: "" } })
    const dispatch = useDispatch()

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
            }
        }))
    }, [currentRoute])

    useEffect(() => {
        if (isVisible && visibleState === 'newThemeForm')
            setState(state => ({ ...state, showTemplateForm: true }))
        else
            setState(state => ({ ...state, showTemplateForm: false }))
    }, [isVisible, visibleState])

    const handleOnChange = () => {
        let isValid = false

        const field = getValues('headerField') || ""

        isValid = isRouteMatch('/templates')
            ? field.length ? true : false
            : pattern.test(field)

        setState((state) => ({
            ...state,
            textField: {
                ...state.textField,
                isValid: isValid
            }
        }))
    }

    const onSubmit = (e) => {
        console.log(e);

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    {
                    ...register("headerField", {
                        required: !isRouteMatch('/templates') ? "invalid url" : undefined,
                        pattern: !isRouteMatch('/templates') ? pattern : undefined,
                        onChange: handleOnChange
                    }
                    )
                    }

                    id="finder"
                    className={cn(style.search_field)}
                    placeholder={state.textField?.placeholder}
                    icon={isRouteMatch('/templates') ?
                        <LuSearch
                            role="button"
                            cursor="pointer"
                            fontSize="2rem"
                            color={state.textField?.isValid ? "#fff" : "#3A466C"}
                            className={cn(style.field_icon, { [style['active']]: state.textField?.isValid })} /> :
                        <PiTreeStructureFill
                            role="button"
                            cursor="pointer"
                            fontSize="2rem"
                            color={state.textField?.isValid ? "#fff" : "#3A466C"}
                            title="extract"
                            className={cn(style.field_icon, { [style['active']]: state.textField?.isValid })} />}
                />
            </form>
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