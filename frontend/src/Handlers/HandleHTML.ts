import { api } from "./handle.config";

export const HTMLGenerate = async (id: string, spreadsheet: string, offset?: number, limit?: number) => {


	const headers = {
		Accept: "application/zip",
	};
	return api.get(`/template/${id}/generate?offset=${offset}&limit=${limit}&spreadsheet=${spreadsheet}`, { headers, responseType: "arraybuffer" });
};
