import { S3 } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import { JWT } from "google-auth-library";
const env = config();

const { CLIENT_EMAIL, PRIVATE_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SECRET, API_KEY } = env.parsed;

export const secret = SECRET;
export const api_key = API_KEY;

// google spreadsheet api service
export const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// amazon web services S3 Bucket
const region = "ap-southeast-2";
const accessKeyId = AWS_ACCESS_KEY_ID;
const secretAccessKey = AWS_SECRET_ACCESS_KEY;

export const webServicesS3Auth = new S3({
    region,

    credentials: {
        accessKeyId,
        secretAccessKey,
    },

    // The key signatureVersion is no longer supported in v3, and can be removed.
    // @deprecated SDK v3 only supports signature v4.
    signatureVersion: "v4",
});

// defaults
export const expires = {
    at: "60s",
    rt: "1h",
};
