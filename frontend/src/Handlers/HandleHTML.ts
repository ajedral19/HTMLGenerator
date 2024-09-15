import { api } from "./handle.config";

export const HTMLGenerate = async (id: string, spreadsheet: string) => {
	console.log(`/template/${id}/generate?spreadsheet=${spreadsheet}`);

	const headers = {
		Accept: "application/zip",
	};
	return api.get(`/template/${id}/generate?spreadsheet=${spreadsheet}`, { headers, responseType: "arraybuffer" });
};
