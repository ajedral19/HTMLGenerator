import axios from "axios";
import fileDownload from "js-file-download";
import { io } from "socket.io-client";

const api = axios.create({
	baseURL: "/api",
	timeout: 60000,
	headers: {
		"X-Custom-Header": "Hello",
	},
});
const socket = io("http://localhost:9100/");

// donwload files
export const DownloadFile = (id: string, filename: string) => {
	api
		.get("/download/someid")
		.then((res) => fileDownload(res.data, `${id}-${filename}.html`))
		.catch((err) => console.log(err.message));
};

// generate textbook
export const GenerateTexbook = (template_id: string, sheet_id: string) => {
	const headers = {
		// 'Content-Type': 'application/json',
		Accept: "application/zip",
	};
	const payload = {
		template_id: template_id,
		sheet_id: sheet_id,
	};
	return api.post("/generate", payload, { headers, responseType: "arraybuffer" });
	// .then(res => fileDownload(res.data, 'textbook.zip'))
	// .catch(err => console.log(err.message))
};

// templates
// save templates
export const SaveTemplate = (template: unknown, name: unknown, sheet: unknown) => {
	const headers = {
		"Content-Type": "application/json",
	};
	const payload = {
		template,
		name,
		sheet,
	};

	api
		.post("/template/register", payload, { headers })
		.then((res) => {
			res.data;
			socket.emit("templates");
		})
		.catch((err) => console.error(err.message));
};

export const DeleteTemplate = (id: string) => {
	const headers = {
		"Content-Type": "application/json",
	};

	api
		.delete(`/template/${id}/delete`, { headers })
		.then((res) => {
			if (res.data) {
				socket.emit("templates");
			}
		})
		.catch((err) => console.error(err.message));
};

// get templates
export const GetTemplates = async (signal?: AbortSignal) => {
	return api
		.get("/templates", { signal })
		.then((res) => res.data)
		.catch((err) => console.error(err.name, err.message));
};

export const GetTemplate = async (id: string, signal?: AbortSignal) => {
	return api
		.get(`/template/${id}`, { signal })
		.then((res) => res.data)
		.catch((err) => console.log(err.name));
};

export const ViewTemplate = async (id: string, signal?: AbortSignal) => {
	return api
		.get(`/template/${id}/preview`, { signal })
		.then((res) => res.data)
		.catch((err) => console.log(err.name));
};
