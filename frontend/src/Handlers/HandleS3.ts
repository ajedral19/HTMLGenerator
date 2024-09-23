import axios from "axios";
import { API } from "./handle.config";

export const S3Put = async (file, path = "stylesheets") => {
	let { name, type } = file;

	if (!type) type = "text/plain";

	const headers = { "Content-Type": "application/json" };
	const query = path ? `path=${path}&filename=${name}` : `filename=${name}`;
	const { data } = await axios.get("/bucket/api/get-secure-url?" + query, {
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
