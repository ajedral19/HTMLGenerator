import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import useTheme from "../Hooks/useTheme";
import cn from 'classnames'
import { Button } from "./Widgets";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

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
                        <Button icon={isDark ? <MdOutlineWbSunny fontSize="2rem" /> : <IoMdMoon fontSize="2rem" />} variant="transparent" onClick={() => setIsDark(!isDark)} />
                    </li>
                </ul>
            </div>
        </nav>
    </Fragment>
}