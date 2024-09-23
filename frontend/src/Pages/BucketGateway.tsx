import { Fragment } from "react/jsx-runtime";
import { Button } from "../Components/Widgets";
import FileUpload from "../Components/Form/File";
import { S3Put } from "../Handlers/HandleS3";

export default function BucketGateway() {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()


        if (e.target) {
            const form = e.target
            const file = form.field_file.files[0]
            // const { name } = file
            S3Put(file)
        }

        // console.log(e.target?.field_file.files[0]);



    }
    return <Fragment>
        <h1>S3 bucket</h1>
        <form onSubmit={handleSubmit}>
            <FileUpload name="field_file" accept="text/css" />
            <Button type="submit" text="Upload" />
        </form>
    </Fragment>
}