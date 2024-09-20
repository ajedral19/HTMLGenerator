import { api } from "./handle.config";

export const DocumentExtract = async (src: string) => {
	if (!src) return ["No Data"];
	return api
		.get(`/data/extract?spreadsheet=${src}`)
		.then((response) => response.data)
		.catch((err) => err);
};
