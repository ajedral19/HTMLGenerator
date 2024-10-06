import { Fragment, useEffect, useState } from "react";
import Field from "./Widgets/field.widget";
import cn from 'classnames'
import style from '../Styles/header.module.sass'
import { LuSearch } from "react-icons/lu";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Button } from "./Widgets";
import { MdAdd, MdArrowBack, MdArrowForward, MdClose, MdDataArray, MdDataObject } from "react-icons/md";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { headerOptions } from "../Redux/Slices/header";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { showSidePane } from "../Redux/Slices/sidePane";
import { PiTreeStructureFill } from "react-icons/pi";
import { init_details } from "../Utils/initialStates";

type state = {
    hasTemplates: boolean
    isFiddle: boolean
    isTemplateForm: boolean
}


export default function Header() {
    const navigate = useNavigate()
    const currentRoute = useLocation()

    const [state, setState] = useState<state>({
        hasTemplates: false,
        isFiddle: false,
        isTemplateForm: false
    })

    const selector = useSelector((state: { sidePane: { visibleState?: "newThemeForm" | "themeDetails", isVisible: boolean } }) => state.sidePane)
    const { visibleState, isVisible } = selector


    const { register, watch } = useForm<{ headerField: string }>({ defaultValues: { headerField: "" } })
    const isGrid = useSelector((state: { headerOptions: { display: { isGrid: boolean } } }) => state.headerOptions.display.isGrid)
    const dispatch = useDispatch()

    const handleDisplay = (state: boolean) => {
        dispatch(headerOptions({ display: { isGrid: state } }))
    }

    const handleShowSidePane = () => {
        dispatch(showSidePane({ isVisible: true, details: init_details, visibleState: "newThemeForm" }))
    }

    const handleCloseSidePane = () => {
        dispatch(showSidePane({ isVisible: false, visibleState: undefined }))
    }

    useEffect(() => {
        if (matchRoutes([{ path: '/templates' }], currentRoute)) {
            setState((state: state) => ({ ...state, hasTemplates: true }))
            setState((state: state) => ({ ...state, isFiddle: false }))
        }
        else {
            setState((state: state) => ({ ...state, hasTemplates: false }))
            setState((state: state) => ({ ...state, isFiddle: true }))
        }
    }, [currentRoute])

    useEffect(() => {
        if (isVisible && visibleState === 'newThemeForm')
            setState(state => ({ ...state, isTemplateForm: true }))
        else
            setState(state => ({ ...state, isTemplateForm: false }))
    }, [isVisible, visibleState])




    return <Fragment>
        <div className={cn(style.header)}>
            {
                state.hasTemplates &&
                <div className={cn(style.display_layout_options)}>
                    <Button icon={<BsGrid3X3GapFill />} className={cn({ ["transparent"]: !isGrid })} onClick={() => handleDisplay(true)} />
                    <Button icon={<FaThList />} className={cn({ ["transparent"]: isGrid })} onClick={() => handleDisplay(false)} />
                </div>
            }
            <Field
                {...register("headerField")}
                id="finder"
                placeholder={
                    !state.isFiddle ?
                        "Looking for a template? Find by typing here"
                        : "Enter a Spreadsheet URL or ID"
                }
                className={cn(style.search_field)}
                icon={
                    state.hasTemplates ?
                        <LuSearch
                            cursor="pointer"
                            fontSize="2rem"
                            color="#3A466C" />
                        : <PiTreeStructureFill
                            cursor="pointer"
                            fontSize="2rem"
                            color="#3A466C" />
                }
            />
            {
                state.hasTemplates &&
                <Fragment>
                    <Button
                        icon={
                            state.isTemplateForm ?
                                <MdClose fontSize="2rem" />
                                :
                                <MdAdd fontSize="2rem" />
                        }
                        className="mr-auto"
                        onClick={state.isTemplateForm ? handleCloseSidePane : handleShowSidePane} />
                    <Button text="Template Fiddle" icon={<MdArrowForward fontSize="2rem" />} rtl href="/templates/fiddle" />
                </Fragment>
            }
            {!state.hasTemplates && <Button className="ml-auto" text="Templates" icon={<MdArrowBack fontSize="2rem" />} onClick={() => navigate('/templates')} />}
        </div>
    </Fragment>
}