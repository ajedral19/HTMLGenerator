import { Fragment } from "react/jsx-runtime";
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useExtract from "../Hooks/useExtract";
import { useEffect, useState } from "react";

type State = {
    data: any
}

export default function CodeView() {
    const [state, setState] = useState<State>()
    const { url } = useSelector((state: RootState) => state.spreadsheet)
    const { data } = useExtract(url)

    useEffect(() => {
        setState({ data })
    }, [data])
    return <Fragment>
        <MarkdownPreview source={`\`\`\`json\n${JSON.stringify(state?.data, null, "  ")}`} style={{ display: "block", overflow: "auto" }} />
    </Fragment>
}