import { Link, useParams, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
// import Button from "./Button";
import useTheme from "../Hooks/useTheme";
import cn from 'classnames'
import { URLSearchParams } from "url";
import { TbBulb, TbBulbOff } from "react-icons/tb";
import { Button } from "./Widgets";


export default function Navbar({ className }: { className: string }) {
    const [isDark, setIsDark] = useTheme()

    return <Fragment>
        <nav>
            <div className={cn("navbar container", className)}>
                <div className="logo">
                    <Link to="/">
                        <img src="/logo.png" width="38px" alt="" />
                    </Link>

                </div>
                <ul className="menu">
                    <li className="menu__item">
                        <Link to="/documentation">Documentation</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/templates">Templates</Link>
                    </li>
                    <li className="menu_item">
                        <Button icon={isDark ? <TbBulb fontSize="2rem" /> : <TbBulbOff fontSize="2rem" />} variant="transparent" onClick={() => setIsDark(!isDark)} />
                    </li>
                    {/* <li className="menu__item">
                        <Link to="/backlog">Backlog</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/helper">Helper</Link>
                    </li> */}
                    {/* <li className="menu__item">
                        <Button variant="primary" text="Switch Theme" onClick={() => { }} />
                    </li> */}
                </ul>
            </div>
        </nav>
    </Fragment>
}