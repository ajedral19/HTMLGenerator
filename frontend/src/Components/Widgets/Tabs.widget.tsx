import { Fragment, ReactNode, useState } from "react"
import cn from 'classnames'
import style from '../../Styles/tabs.module.sass'

type Tab = {
    name: string
    component: JSX.Element
}

type Tabs = {
    tabs: Tab[]
}

type State = {
    tab: Tab
}


export default function Tabs({ tabs }: Tabs) {
    const [state, setState] = useState<State>({ tab: tabs[0] })

    const handleOnClick = (tab: Tab) => {
        setState(currentState => ({ ...currentState, tab }))
    }

    return <Fragment>
        <div className={cn(style.tabs)}>
            <ul className={cn(style.tabs__tabs)}>
                {tabs && tabs.map((tab, index) => (
                    <li key={index} role='button' className={cn(style.tabs__tabs__tab, { [style.active]: tab.name === state?.tab.name })} onClick={() => handleOnClick(tab)}>{tab.name}</li>
                ))}
            </ul>

            {
                state?.tab &&
                <div className={cn(style.tabs__panel)}>{state.tab.component}</div>
            }
        </div>
    </Fragment>
}