import { Fragment } from "react/jsx-runtime";
import { Button } from "../Components/Widgets";
import FileUpload from "../Components/Form/File";

export default function BucketGateway() {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()



        console.log(e.target?.img_field);



    }
    return <Fragment>
        <h1>S3 bucket</h1>
        <form onSubmit={handleSubmit}>
            <FileUpload name="img_field" />
            <Button type="submit" text="Upload" />
        </form>
    </Fragment>
}