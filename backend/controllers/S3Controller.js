import aws from "aws-sdk";
import { config } from "dotenv";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);

const env = config();

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = env.parsed;

const region = "ap-southeast-2";
const bucketName = "learning-s3-bucket-v2";
const accessKetId = AWS_ACCESS_KEY_ID;
const secretAccessKey = AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKetId,
    secretAccessKey,
    signatureVersion: "v4",
});

export const handle_s3 = async (req, res) => {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex");
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
    };

    const url = await s3.getSignedUrlPromise("putObject", params);
    return res.send({ url });
};

export const handle_s3_get = async (req, res) => {
    const params = {
        Bucket: bucketName,
    };

    await s3
        .listObjects(params)
        .promise()
        .then((data) => {
            console.log(data);
            const base_url = `https://learning-s3-bucket-v2.s3.ap-southeast-2.amazonaws.com/${bucketName}`;
            const urls = data.Contents.map((item) => base_url + item.Key);
            console.log(urls);
        })
        .catch((err) => console.log(err));

    res.send("okay");
};
