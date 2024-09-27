import { Fragment } from "react/jsx-runtime";
import { Button } from "../Components/Widgets";
import FileUpload from "../Components/Form/File";
import { S3Put } from "../Handlers/HandleS3";
import useS3Objects from "../Hooks/useS3Objects";

export default function BucketGateway() {

    const { data, isLoading, MutateBucket, isPending } = useS3Objects()
    console.log(data, isLoading);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // alert('function disable ATM')
        // return


        if (e.target) {
            const form = e.target
            const file = form.field_file.files[0]
            // const { name } = file
            S3Put(file)
            MutateBucket()
        }

        // console.log(e.target?.field_file.files[0]);
    }

    const gotoOnClick = (cdn: string) => {
        window.open(cdn, 'rel=noopener noreferrer')
    }


    return <Fragment>
        <h1>S3 bucket</h1>
        <form onSubmit={handleSubmit}>
            <FileUpload name="field_file" accept="text/css;text/sass;text/scss" />
            <Button type="submit" text="Upload" />

            <ul>
                {
                    !isLoading ? (
                        data.objects.map((row, key) => (
                            <li key={key}>
                                <a role="button" onClick={() => gotoOnClick(row.Key)} >{row.Key}</a>
                            </li>
                        ))
                    ) :
                        <li>loading...</li>
                }
            </ul>
        </form>
    </Fragment>
}