import axios from "axios";
import { loaderState } from "../Redux/Slices/loader";
import { useDispatch } from "react-redux";
import store from "../store";

export const API = (baseURL: string, timeout: number, headers?: any) =>
	axios.create({
		baseURL,
		timeout,
		headers,
		onDownloadProgress: (progressEvent) => {
			const { loaded, total, bytes } = progressEvent;
			store.dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: total }));
			// dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: total }));
			// loaderState({ progress: Math.round((loaded / total) * 100), max: total })
			// console.log(Math.round((loaded / total) * 100), "loads");
		},
	});

export const api = API("/api", 60000, { "X-Custom-Header": "Hello" });

export const html = API("/html", 60000);
