import { ChangeEvent, Fragment, useEffect, useState } from "react"
import cn from 'classnames'
import style from '../../Styles/select.module.sass'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md"
import { useForm } from "react-hook-form"

type Option = {
    id: string
    name: string
}

type Select = {
    options: Option[]
    name: string
    placeholder?: string
}

type State = {
    options: Option[]
    selection?: Option
    toggled: boolean
    optionsCount: number
}

export default function Select({ options, name, placeholder }: Select) {
    const { register, setValue, } = useForm()
    const [state, setState] = useState<State>({ options: options, toggled: false, optionsCount: options.length - 1 })

    useEffect(() => {
        if (state.toggled) {
            window.addEventListener('keyup', handleKeyPress)
        }
        return () => window.removeEventListener('keyup', handleKeyPress)
    }, [state.toggled])

    // useEffect(() => {
    //     setValue(name, "test")
    // }, [])

    const handleKeyPress = (e: KeyboardEvent) => {
        const event = e.code.toLowerCase()
        if (event === 'escape') {
            setState((currentState) => ({ ...currentState, toggled: false, options: options }))
            setValue(name, state.selection?.name)
        }
    }

    const handleSelect = (selection: Option) => {
        setValue(name, selection.name)
        setState(currentState => ({
            ...currentState,
            filtered: currentState.options,
            selection,
            options: currentState.options, toggled: false
        }));
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value.split(' ').join('').toLowerCase()
        const filtered = options.filter(option => option.name.split(' ').join('').toLowerCase().includes(keyword))

        setState(currentState => ({ ...currentState, options: filtered, toggled: true }));
    }

    const toggleOnClick = () => {
        setState((currentState) => ({ ...currentState, toggled: !currentState.toggled, options: currentState.options }))
        if (state.selection)
            setValue(name, state.selection.name)
    }

    return <Fragment>
        <div className={cn(style.select)} >
            <p className={cn(style.select__field)}>
                <input {...register(name, {
                    onChange: (e) => handleOnChange(e)
                })}
                    type="text" id={name}
                    placeholder={placeholder}
                    onClick={toggleOnClick}
                />
                <label role="button" htmlFor={name} >
                    {state.toggled ?
                        <MdOutlineArrowDropUp /> :
                        <MdOutlineArrowDropDown />}
                </label>
            </p>
            {
                state.toggled &&
                <ul className={cn(style.select__options)}>
                    {
                        <Fragment>
                            {
                                state.options.length ?
                                    state.options.map((option, index) =>
                                        <li className={cn(
                                            style.option,
                                            { [style.selected]: option.id === state.selection?.id })}
                                            key={index}
                                            onClick={() => handleSelect(option)}>{option.name}</li>
                                    ) : <li className={cn(style.option, style.no_value)}>No options available</li>
                            }
                        </Fragment>
                    }
                </ul>
            }
        </div>
    </Fragment>
}