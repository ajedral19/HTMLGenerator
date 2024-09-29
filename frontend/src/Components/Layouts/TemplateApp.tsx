import { Fragment } from "react/jsx-runtime";
import SidePanel from "../SidePanel";
import { useQuery } from "@tanstack/react-query";
import { GetTemplates } from "../../Handlers/RequestHander";

export default function TemplateApp({ children }: { children: React.ReactNode }) {
    const { isLoading } = useQuery({
        queryFn: () => GetTemplates(),
        queryKey: ["templates"],
    })

    return <Fragment>
        <div className="flex no-gap h-100">
            <div className="col col-2">
                <SidePanel className="bg-unset" />
            </div>
            <div className="col col-6 grow">
                <div className="panel panel--main rounded">
                    {
                        !isLoading ?
                            children : "Loading Templates..."
                    }
                </div>
            </div>
        </div>
    </Fragment>
}