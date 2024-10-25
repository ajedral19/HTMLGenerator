import { Fragment } from "react/jsx-runtime";
import cn from 'classnames'
import style from '../../Styles/button.module.sass'
import { Link } from "react-router-dom";



type Button = {
    text?: string
    icon?: JSX.Element
    title?: string
    name?: string
    href?: string
    id?: string,
    rtl?: boolean
    disabled?: boolean
    className?: string,
    type?: "button" | "submit" | "reset"
    variant?: "primary" | "secondary" | "transparent"
    onClick?: () => void
}

type Options = {
    options?: Button[]
}

type ButtonProps = Button & Options

export default function Button({ text, icon, title, name, href, id, className, rtl, disabled, options, onClick, type = "button", variant = "primary" }: ButtonProps) {

    if (href)
        return <Fragment>
            <Link role="button" to={href} className={cn("btn primary", { ['icon']: icon && !text }, { ['icon-text']: icon && text }, { ["rtl"]: rtl }, { disabled }, className, variant)} title={title} >
                {
                    icon && text ?
                        <Fragment>
                            {
                                rtl ? <><span>{text}</span> {icon}</>
                                    : <>{icon} <span>{text}</span></>
                            }
                        </Fragment> : icon ? icon : text
                }
            </Link>
        </Fragment>

    if (options)
        return <Fragment>
            <div className={cn(style.btn_select)}>
                <button type={type} name={name} id={id} className={cn("btn primary", { ['icon']: icon && !text }, { ['icon-text']: icon && text }, { ["rtl"]: rtl }, className, variant)} disabled={disabled} title={title} onClick={onClick}>
                    {
                        icon && text ?
                            <Fragment>
                                {
                                    rtl ? <><span>{text}</span> {icon}</>
                                        : <>{icon} <span>{text}</span></>
                                }
                            </Fragment> : icon ? icon : text
                    }
                </button>
                <div className={cn(style.btn_select__options)}>
                    {
                        options.map((option, key) => <Button key={key} type={type} text={option.text} icon={option.icon} title={option.title} name={name} href={href} id={id} variant={variant} className={option.className} rtl={rtl} disabled={option.disabled} onClick={option.onClick} />)
                    }
                </div>
            </div>
        </Fragment>

    return <Fragment>
        <button type={type} name={name} id={id} className={cn("btn primary", { ['icon']: icon && !text }, { ['icon-text']: icon && text }, { ["rtl"]: rtl }, className, variant)} disabled={disabled} title={title} onClick={onClick}>
            {
                icon && text ?
                    <Fragment>
                        {
                            rtl ? <><span>{text}</span> {icon}</>
                                : <>{icon} <span>{text}</span></>
                        }
                    </Fragment> : icon ? icon : text
            }
        </button>
    </Fragment>
}