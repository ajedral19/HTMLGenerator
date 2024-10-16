import { loaderState } from "../Redux/Slices/loader";
import store from "../store";
import { api } from "./handle.config";

export const HTMLGenerate = async (id: string, spreadsheet: string, offset?: number, limit?: number) => {
	const headers = {
		Accept: "application/zip",
	};
	return api.get(`/template/${id}/generate?offset=${offset}&limit=${limit}&spreadsheet=${spreadsheet}`, {
		headers,
		responseType: "arraybuffer",
		onDownloadProgress: (progressEvent) => {
			const { loaded, total = 0, bytes } = progressEvent;
			store.dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: bytes }));
		}
	})
};
