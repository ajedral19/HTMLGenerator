import { Fragment } from "react/jsx-runtime";
// import { Button } from "../Components/Widgets";
// import { S3Put } from "../Handlers/HandleS3";
// import useS3Objects from "../Hooks/useS3Objects";

export default function BucketGateway() {

    // const { data, isLoading } = useS3Objects()
    // console.log(data, isLoading);

    // const handleSubmit = (e: React.FormEvent) => {
        // e.preventDefault()
        // alert('function disable ATM')
        // return
        // const target =  (e.target)

        // if (target) {
            // const form = target
            // const file = form.field_file.files[0]
            // const { name } = file
            // S3Put(file)
        // }

        // console.log(e.target?.field_file.files[0]);
    // }

    // const gotoOnClick = (cdn: string) => {
    //     window.open(cdn, 'rel=noopener noreferrer')
    // }
    return <Fragment>
        <h1>S3 bucket</h1>
        {/* <form onSubmit={handleSubmit}>
            <Button type="submit" text="Upload" />

            <ul>
                {
                    !isLoading ? (
                        data.objects.map((row, key) => (
                            <li key={key}>
                                <a role="button" onClick={() => gotoOnClick(row.url)} >{row.fileName}</a>
                            </li>
                        ))
                    ) :
                        <li>loading...</li>
                }
            </ul>
        </form> */}
    </Fragment>
}