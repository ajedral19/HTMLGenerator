import aws from "aws-sdk";
import { config } from "dotenv";
import { JWT } from "google-auth-library";
const env = config();

const { CLIENT_EMAIL, PRIVATE_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = env.parsed;

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

export const webServicesS3Auth = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: "v4",
});
