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
export const GenerateTexbook = (template_id: string, sheet_url: string) => {
	const headers = {
		// 'Content-Type': 'application/json',
		Accept: "application/zip",
	};
	const payload = {
		template_id,
		sheet_url,
	};

	return api.post("/generate?offset=0", payload, { headers, responseType: "arraybuffer" });
	// .then(res => fileDownload(res.data, 'textbook.zip'))
	// .catch(err => console.log(err.message))
};

// templates
// save templates
export const SaveTemplate = async (template: { template: string | unknown, name: string, sheet: string, cdn: string }) => {
	const headers = {
		"Content-Type": "application/json",
	};
	const payload = {
		template: template?.template,
		name: template?.name,
		sheet: template?.sheet,
		cdn: template?.cdn
	};

	return api
		.post("/template/register", payload, { headers })
		.then((res) => {
			return res.data;
			// socket.emit("templates");
		})
		.catch((err) => console.error(err.message));
};

export const DeleteTemplate = async (template: { id: string }) => {
	const { id } = template
	const headers = {
		"Content-Type": "application/json",
	};

	return api
		.delete(`/template/${id}/delete`, { headers })
		.then((res) => {
			return res.data
			// if (res.data) {
			// 	socket.emit("templates");
			// }
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

export const GetSheetCount = async () => {
	return api
		.get(`/template/sheet-count?id=1RwTPIFQSaO6yrTR2g-auHENnr1JMFYbTfQGA4iMF12w`)
		.then((res) => res.data)
		.catch((err) => console.log(err.name));
}

export const GetJSONData = async (spreadsheet_url?: string = "https://docs.google.com/spreadsheets/d/1acVsraSP14boGIEes_FKXC489ZVoaZ04_uOJwbwXHXs/edit?gid=0#gid=0") => {
	return api
		.get(`/extract-sheet?spreadsheet=${spreadsheet_url}`)
		.then((res) => res.data)
		.catch((err) => console.log(err.name));
}