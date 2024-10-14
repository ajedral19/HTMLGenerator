import { loaderState } from "../Redux/Slices/loader";
import store from "../store";
import { api } from "./handle.config";

export const DocumentExtract = async (src: string) => {
	if (!src) return ["No Data"];
	return api
		.get(`/data/extract?spreadsheet=${src}`, {
			onDownloadProgress: (progressEvent) => {
				const { loaded, total, bytes } = progressEvent;
				store.dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: bytes }));
			}
		})
		.then((response) => response.data)
		.catch((err) => err);
};
