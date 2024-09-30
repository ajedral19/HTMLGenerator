import { webServicesS3Auth as s3 } from "../config.js";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);
const bucket = "learning-s3-bucket-v2";
const cloudfront = "d1la2pn5b8fvsr.cloudfront.net/";

export const GetSignedConnection = async (path, filename) => {
	let rawBytes = await randomBytes(6);
	rawBytes = rawBytes.toString("hex");
	const file_path = path ? `${path}/${rawBytes}::${filename}` : `${rawBytes}::${filename}`;

	const params = {
		Bucket: bucket,
		Key: file_path,
		Expires: 60,
	};

	const url = await s3.getSignedUrlPromise("putObject", params);

	return { url: decodeURIComponent(url) };
};

// https://learning-s3-bucket-v2.s3.ap-southeast-2.amazonaws.com/stylesheets/de16e13e53f2%3A%3ADP58AC-ezgif.com-resize.gif
export const ListObjects = async (prefix) => {
	prefix = prefix || "";
	const contents = await s3
		.listObjects({ Bucket: bucket, Prefix: prefix })
		.promise()
		.then((data) =>
			data.Contents.map((content) => ({
				url: cloudfront + content.Key,
				fileName: content.Key.split("::")[1],
				size: content.Size,
				lastModified: content.LastModified,
			}))
		);

	return { objects: contents };
};
