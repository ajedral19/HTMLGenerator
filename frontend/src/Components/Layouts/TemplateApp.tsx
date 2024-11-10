import { Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import Header from "../Header";
import ProgressBar from "../Widgets/progressBar.widget";
import { TemplateFindAll } from "../../Handlers/HandleTemplate";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TemplateApp({ children }: { children: React.ReactNode }) {

    const archives = useSelector((state: RootState) => state.headerOptions.display.archives)

    const { isLoading } = useQuery({
        queryFn: () => TemplateFindAll(archives),
        queryKey: ["templates"],
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        // initializeIndexStore()
    }, [])

    return <Fragment>
        <div className="h-100">
            <ProgressBar />
            <div className="panel panel--main rounded">
                {
                    !isLoading ?
                        <Fragment>
                            <Header />
                            <main className="main">
                                {children}
                            </main>
                        </Fragment>
                        : "Loading Templates..."
                }
            </div>
        </div>
    </Fragment>
}