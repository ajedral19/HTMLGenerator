import { Fragment } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useEffect } from "react";

export default function Pagination({ row_count = 10, listener, limit }: { row_count?: number, listener?: (page: number) => void, limit?: number }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const n_of_pages = Array.from(Array(row_count), (_, k) => k)

    const handleOnclick = (n: number) => {
        setSearchParams({ page: n.toString(), of: n_of_pages.length.toString() })
    }

    useEffect(() => {
        const param = searchParams.get('page') || '1'
        const page = parseInt(param)

        if (listener) listener(page);

    }, [searchParams])

    return <Fragment>
        <ul>
            {n_of_pages.map((n, key) => (
                <li key={key}>
                    <Button text={(n + 1).toString()} variant="transparent" onClick={() => handleOnclick(n + 1)} />
                </li>
            ))}
        </ul>
    </Fragment>
}