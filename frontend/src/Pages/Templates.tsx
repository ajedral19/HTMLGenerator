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
import { useEffect } from "react";

const templatesData: TemplateDetails[] = [
    {
        data: {
            "id": "C1D2E3",
            "name": "Template Eleven",
            "author": "Luna Lovegood",
            "ticket": {
                "id": "TK-1112",
                "url": "www.example11.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit",
            "isFavorite": true,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style11.css",
                    "url": "example11.com/style11.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "F4G5H6",
            "name": "Template Twelve",
            "author": "Draco Malfoy",
            "ticket": {
                "id": "TK-1314",
                "url": "www.example12.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1K2L3M4N5O6P7Q8R9S0T/edit",
            "isFavorite": false,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style12.css",
                    "url": "example12.com/style12.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "I7J8K9",
            "name": "Template Thirteen",
            "author": "Neville Longbottom",
            "ticket": {
                "id": "TK-1516",
                "url": "www.example13.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1U2V3W4X5Y6Z7A8B9C0D/edit",
            "isFavorite": true,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style13.css",
                    "url": "example13.com/style13.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "L0M1N2",
            "name": "Template Fourteen",
            "author": "Minerva McGonagall",
            "ticket": {
                "id": "TK-1718",
                "url": "www.example14.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1E2F3G4H5I6J7K8L9M0N/edit",
            "isFavorite": false,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style14.css",
                    "url": "example14.com/style14.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "O3P4Q5",
            "name": "Template Fifteen",
            "author": "Severus Snape",
            "ticket": {
                "id": "TK-1920",
                "url": "www.example15.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1P2Q3R4S5T6U7V8W9X0Y/edit",
            "isFavorite": true,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style15.css",
                    "url": "example15.com/style15.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "R6S7T8",
            "name": "Template Sixteen",
            "author": "Sirius Black",
            "ticket": {
                "id": "TK-2122",
                "url": "www.example16.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1Z2A3B4C5D6E7F8G9H0I/edit",
            "isFavorite": false,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style16.css",
                    "url": "example16.com/style16.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        },
    },
    {
        data: {
            "id": "U9V0W1",
            "name": "Template Seventeen",
            "author": "Remus Lupin",
            "ticket": {
                "id": "TK-2324",
                "url": "www.example17.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1J2K3L4M5N6O7P8Q9R0S/edit",
            "isFavorite": true,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style17.css",
                    "url": "example17.com/style17.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "X2Y3Z4",
            "name": "Template Eighteen",
            "author": "Albus Dumbledore",
            "ticket": {
                "id": "TK-2526",
                "url": "www.example18.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1A3B4C5D6E7F8G9H0I/edit",
            "isFavorite": false,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style18.css",
                    "url": "example18.com/style18.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "A5B6C7",
            "name": "Template Nineteen",
            "author": "Ginny Weasley",
            "ticket": {
                "id": "TK-2728",
                "url": "www.example19.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1J3K4L5M6N7O8P9Q0R/edit",
            "isFavorite": true,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style19.css",
                    "url": "example19.com/style19.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
    {
        data: {
            "id": "D8E9F0",
            "name": "Template Twenty",
            "author": "Fred Weasley",
            "ticket": {
                "id": "TK-2929",
                "url": "www.example20.com"
            },
            "spreadsheetURL": "https://docs.google.com/spreadsheets/d/1K3L4M5N6O7P8Q9R0S/edit",
            "isFavorite": false,
            "image": "/images/template-placeholder.png",
            "stylesheets": [
                {
                    "name": "style20.css",
                    "url": "example20.com/style20.css"
                }
            ],
            "uploadDate": "2024-10-06T12:00:00Z"
        }
    },
]

export default function Templates() {

    const quertClient = useQueryClient()

    const templates: { rows: TemplateDetails[] } = quertClient.getQueryData(['templates']) || { rows: [] }


    const dispatch = useDispatch()
    const sidePane = useSelector((state: { sidePane: { isVisible: boolean, visibleState?: string, details?: TemplateDetails } }) => state.sidePane)

    const handleClose = () =>
        dispatch(showSidePane({ isVisible: false, visibleState: undefined, details: init_details }))

    useEffect(() => {
        console.log(sidePane.details);
        
    }, [sidePane.visibleState])


    return <Fragment>
        <div className={cn(style.templates_layout, { [style['templates_layout--side_pane_visible']]: sidePane.isVisible })}>
            <div className={cn(style.templates_layout__templates)}>
                <TemplatesGrid data={templates.rows} />
            </div>
            <div className={cn(style.templates_layout__sidepane)}>
                <Button icon={<MdClose />} className={cn("small mild-opaque", style.btn_close)} onClick={handleClose} />
                {
                    sidePane.visibleState === 'themeDetails' ?
                        <Details data={sidePane.details?.data || init_details.data} /> 
                        // <h1>test</h1>
                        :
                        sidePane.visibleState === "newThemeForm" ?
                            <TemplateForm /> :
                            <h1>Unknow Actions has been triggered</h1>
                }
            </div>

        </div>
    </Fragment>
}