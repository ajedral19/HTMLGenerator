import { JSONDataReducer } from "../Redux/Slices/JSONData";
import { loaderState } from "../Redux/Slices/loader";
import store from "../store";
import { api } from "./handle.config";

export const DocumentExtract = async (src: string) => {
	if (!src) return ["No Data"];
	return api.get(`/data/extract?spreadsheet=${src}`, {
		onDownloadProgress: (progressEvent) => {
			const { loaded, total = 0, bytes } = progressEvent;
			store.dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: bytes, state: "jsonData" }));
		},
	}).then(axiosResponse => {
		const data = axiosResponse.data.rows
		let rows = data
		if (Array.isArray(data))
			if (data.length)
				rows = data[0]

		store.dispatch(JSONDataReducer({ data: rows }))
		return rows
	}).catch(err => {
		return err.response.data
	})
};
