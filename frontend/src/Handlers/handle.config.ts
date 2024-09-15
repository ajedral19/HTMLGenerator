import axios from "axios";

export const API = (baseURL: string, timeout: number, headers?: any) =>
	axios.create({
		baseURL,
		timeout,
		headers,
	});

export const api = API("/api", 60000, { "X-Custom-Header": "Hello" });

export const html = API("/html", 60000);
