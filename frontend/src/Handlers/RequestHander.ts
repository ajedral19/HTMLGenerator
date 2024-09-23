import axios from "axios";
import { log } from "console";
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
// migrated
export const GenerateTexbook = (template_id: string, sheet_url: string, offset?: number, limit?: number) => {
	const headers = {
		// 'Content-Type': 'application/json',
		Accept: "application/zip",
	};
	const payload = {
		template_id,
		sheet_url,
		offset,
		limit
	};

	return api.post("/generate?offset=0", payload, { headers, responseType: "arraybuffer" });
	// .then(res => fileDownload(res.data, 'textbook.zip'))
	// .catch(err => console.log(err.message))
};

// templates
// save templates
// migrated
export const SaveTemplate = async (template: {
	template: string | unknown;
	name: string;
	sheet: string;
	cdn: string;
}) => {
	const headers = {
		"Content-Type": "application/json",
	};
	const payload = {
		template: template?.template,
		name: template?.name,
		sheet: template?.sheet,
		cdn: template?.cdn,
	};

	return api
		.post("/template/register", payload, { headers })
		.then((res) => {
			return res.data;
			// socket.emit("templates");
		})
		.catch((err) => console.error(err.message));
};
// migrated
export const DeleteTemplate = async (template: { id: string }) => {
	const { id } = template;
	const headers = {
		"Content-Type": "application/json",
	};

	return api
		.delete(`/template/${id}/delete`, { headers })
		.then((res) => {
			return res.data;
			// if (res.data) {
			// 	socket.emit("templates");
			// }
		})
		.catch((err) => console.error(err.message));
};

// get templates
// migrated
export const GetTemplates = async (page?: string, signal?: AbortSignal) => {
	return api
		.get(`/templates${page ? "?page=" + page : ""}`, { signal })
		.then((res) => res.data)
		.catch((err) => console.error(err.name, err.message));
};

// migrated
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
};

// migrated
export const GetJSONData = async (spreadsheet?: string) => {
	console.log(spreadsheet, "hihi");

	if (!spreadsheet) return ["No data"];
	return api
		.get(`/extract-sheet?spreadsheet=${spreadsheet}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
