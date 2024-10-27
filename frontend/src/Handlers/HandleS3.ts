import axios from "axios";
import { API } from "./handle.config";

export const S3Put = async (file: {name: string, type: string}, path = "") => {
	let { name, type } = file;

	if (!type) type = "text/plain";

	const headers = { "Content-Type": "application/json" };
	const query = path ? `path=${path}&filename=${name}` : `filename=${name}`;
	const { data } = await axios.get("/bucket/api/request?" + query, {
		headers,
	});
	const { url } = data;

	if (url)
		await axios.put(url, file, { headers: { "Content-Type": type, "Content-Disposition": "inline;filename=" + name } });
	// const { url } = await s3.put("/upload", payload, { headers });

	// s3.put("/upload", payload, { headers })
	// 	.then((response) => response.data)
	// 	.catch((err) => err);
};

export const S3Fetch = async () => {
	const bucket = API("/bucket/api", 6000);
	return bucket
		.get("/resources")
		.then((response) => response.data)
		.catch((err) => err);
};
