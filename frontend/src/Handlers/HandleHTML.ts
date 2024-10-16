import { AxiosResponse } from "axios";
import { loaderState } from "../Redux/Slices/loader";
import store from "../store";
import { api } from "./handle.config";

export const HTMLGenerate = async (id: string, spreadsheet: string, offset?: number, limit?: number) => {
	const headers = {
		Accept: "application/zip",
	};
	return api
		.get(`/template/${id}/generate?offset=${offset}&limit=${limit}&spreadsheet=${spreadsheet}`, {
			headers,
			responseType: "arraybuffer",
			onDownloadProgress: (progressEvent) => {
				const { loaded, total = 0, bytes } = progressEvent;
				store.dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: bytes }));
				console.log("went through here");
			},
		})
		.then((axiosResponse) => {
			const headers = new Headers();
			const response: Response = new Response(axiosResponse.data, {
				headers: { ...axiosResponse.headers, ...headers },
				status: axiosResponse.status,
				statusText: axiosResponse.statusText,
			});

			const CacheName = `Generate`;
			const url = axiosResponse.config.url ? axiosResponse.config.url : "";
			caches
				.open(CacheName)
				.then((cache) => {
					cache.put(url, response);
					return cache;
				})
				.then((cacheResponse) => {
					cacheResponse.keys(url).then((responseUrl) => console.log(responseUrl));
				});

			return axiosResponse;
		});

	// return fetch(`/template/${id}/generate?offset=${offset}&limit=${limit}&spreadsheet=${spreadsheet}`, {
	// 	method: "GET",
	// 	headers,
	// }).then((response) => console.log(response));
};

export const CacheHTMLGenerate = (id: string, spreadsheet: string, offset?: number, limit?: number) => {
	const urlString = `/template/${id}/generate?offset=${offset}&limit=${limit}&spreadsheet=${spreadsheet}`;
	caches.open(CacheName).then((cache) => {
		const response = new Response();
		cache.put(urlString, response);
		return cache;
	});
};
