import { useForm } from "react-hook-form"

const Form = ({ handler }) => {
    const { register, handleSubmit, watch, formData{ errors }
} = useForm()


const onSubmit = (data) => {
    handler(data)
}

return <>
    <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" />
        </form>
    </div>
</>
}

export default Form