import { Fragment } from "react/jsx-runtime";
import SidePanel from "../SidePanel";
import { useQuery } from "@tanstack/react-query";
import { GetTemplates } from "../../Handlers/RequestHander";
import Header from "../Header";

export default function TemplateApp({ children }: { children: React.ReactNode }) {
    const { isLoading } = useQuery({
        queryFn: () => GetTemplates(),
        queryKey: ["templates"],
    })

    return <Fragment>
        <div className="h-100">
            <div className="panel panel--main rounded">
                {
                    !isLoading ?
                        <Fragment>
                            <Header />
                            <main className="pt-2">
                            {children}
                            </main>
                        </Fragment>
                        : "Loading Templates..."
                }
            </div>
        </div>
    </Fragment>
}