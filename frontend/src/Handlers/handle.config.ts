import axios from "axios";
import { loaderState } from "../Redux/Slices/loader";
import { useDispatch } from "react-redux";
import store from "../store";

export const API = (baseURL: string, timeout: number, headers?: any) =>
	axios.create({
		baseURL,
		timeout,
		headers: { "x-api-key": "api-secret-key", ...headers }
	});

export const api = API("/api", 60000, { "X-Custom-Header": "Hello", "x-api-key": "api-secret-key" });

export const html = API("/html", 60000);
