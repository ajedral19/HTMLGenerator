import { Fragment, useState } from "react";

type State = {
    title?: string
}

export default function Editable({ defaultValue = "Untitled" }: { name?: string, defaultValue: string }) {
    const [state, setState] = useState<State>({ title: defaultValue })

    const handleOnBlur = (e: React.FocusEvent<HTMLElement>) => {
        const { textContent } = e.target
        setState(currentState => ({ ...currentState, title: textContent || defaultValue }));
    }

    return <Fragment>
        <p
            tabIndex={1}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onFocus={() => setState(currentState => ({ ...currentState, title: state.title == defaultValue ? "" : state.title }))}
            onBlur={handleOnBlur}>{state?.title}</p>
    </Fragment>
}