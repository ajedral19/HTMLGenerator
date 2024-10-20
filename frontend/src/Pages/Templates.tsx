import { Fragment } from "react/jsx-runtime";
import { Button } from "../Components/Widgets";
import Details from "../Components/Details";
import cn from 'classnames'
import style from '../Styles/templates.module.sass'
import { useDispatch, useSelector } from "react-redux";
import { showSidePane } from "../Redux/Slices/sidePane";
import { TemplateData, TemplateDetails } from "../types";
import { init_details } from "../Utils/initialStates";
import { MdClose } from "react-icons/md";
import TemplateForm from "../Components/Form/TemplateForm";
import TemplatesGrid from "../Components/TemplatesGrid";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getFromIndexStor, getFromIndexStore, indexStore } from "../Utils/IndexedDB";

// const templatesData: TemplateDetails[] = [
//     {
//         data: {
//             "id": "C1D2E3",
//             "name": "Template Eleven",
//             "author": "Luna Lovegood",
//             "ticket": {
//                 "id": "TK-1112",
//                 "url": "www.example11.com"
//             },
//             "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit",
//             "isFavorite": true,
//             "image": "/images/template-placeholder.png",
//             "stylesheets": [
//                 {
//                     "name": "style11.css",
//                     "url": "example11.com/style11.css"
//                 }
//             ],
//             "uploadDate": "2024-10-06T12:00:00Z"
//         }
//     }
// ]

export default function Templates() {

    const quertClient = useQueryClient()
    const [templates, setTemplates] = useState<{ rows: TemplateDetails[] }>({ rows: [] })
    const state = useSelector((state: { loader: { state: string } }) => state.loader.state)

    useEffect(() => {
        const data: { rows: TemplateDetails[] } = quertClient.getQueryData(["templates"]) || { rows: [] }
        setTemplates(data);
    }, [state])

    const dispatch = useDispatch()
    const sidePane = useSelector((state: { sidePane: { isVisible: boolean, visibleState?: string, details?: TemplateDetails } }) => state.sidePane)

    const handleClose = () =>
        dispatch(showSidePane({ isVisible: false, visibleState: undefined, details: init_details }))


    return <Fragment>
        <div className={cn(style.templates_layout, { [style['templates_layout--side_pane_visible']]: sidePane.isVisible })}>
            <div className={cn(style.templates_layout__templates)}>
                <TemplatesGrid data={[...templates.rows]} />
            </div>
            <div className={cn(style.templates_layout__sidepane)}>
                <Button icon={<MdClose />} className={cn("small mild-opaque", style.btn_close)} onClick={handleClose} />
                {
                    sidePane.visibleState === 'themeDetails' ?
                        <Details data={sidePane.details?.data || init_details.data} />
                        :
                        sidePane.visibleState === "newThemeForm" ?
                            <TemplateForm /> :
                            <h1>Unknow Actions has been triggered</h1>
                }
            </div>

        </div>
    </Fragment>
}