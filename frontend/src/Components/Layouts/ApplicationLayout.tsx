import { Fragment } from "react/jsx-runtime";
import SidePanel from "../SidePanel";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
    return <Fragment>
        <div className="flex no-gap h-100">
            <div className="col col-2">
                <SidePanel className="bg-unset" />
            </div>
            <div className="col col-6 grow">
                <div className="panel panel--main rounded">
                    {children}
                </div>
            </div>
        </div>
    </Fragment>
}