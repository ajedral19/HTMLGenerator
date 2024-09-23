import { webServicesS3Auth as s3 } from "../config.js";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);
const bucketName = "learning-s3-bucket-v2";

export const handle_s3_v2 = async (req, res) => {
    const { filename } = req.body;
    const file = req.file;

    // const { filename } = formData;
    // const filename = "some_stylesheet.css";
    // const file = req.file;

    const params = {
        Bucket: bucketName,
        Key: filename,
        Expires: 60,
    };
    
    const url = await s3.getSignedUrlPromise("putObject", params);
    
    return res.send(url);

    return res.send("nothing happened");
};

// export const handle_s3 = async (req, res) => {
//     const rawBytes = await randomBytes(16);
//     const imageName = rawBytes.toString("hex");
//     const params = {
//         Bucket: bucketName,
//         Key: imageName,
//         Expires: 60,
//     };

//     const url = await s3.getSignedUrlPromise("putObject", params);
//     return res.send({ url });
// };

// export const handle_s3_get = async (req, res) => {
//     const params = {
//         Bucket: bucketName,
//     };

//     await s3
//         .listObjects(params)
//         .promise()
//         .then((data) => {
//             const base_url = `ht tps://learning-s3-bucket-v2.s3.ap-southeast-2.amazonaws.com/`;
//             const urls = data.Contents.map((item) => base_url + item.Key);
//             console.log(urls);
//         })
//         .catch((err) => console.log(err));

//     res.send("okay");
// };
