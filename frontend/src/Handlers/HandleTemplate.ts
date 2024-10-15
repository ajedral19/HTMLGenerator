import { error } from "console";
import { api } from "./handle.config";
import store from "../store";
import { loaderState } from "../Redux/Slices/loader";

type Template = {
	// templateFiles: file | files[] // maximum of two
	templateFiles: FileList; // | File
	templateName: string;
	spreadsheet: string;
	cdn: string;
	stylesheetId: string | string[];
};

export const TemplateSave = async (template_prop: Template) => {
	const { templateFiles, templateName, spreadsheet, cdn, stylesheetId } = template_prop;
	const headers = { "Content-Type": "multipart/form-data" };
	const payload = {
		template: templateFiles[0],
		name: templateName,
		sheet: spreadsheet,
		cdn: cdn,
		// stylesheetId,
	};

	// console.log(payload);

	// return

	return api
		.post("/template/add", payload, { headers })
		.then((response) => response.data)
		.catch((err) => console.log(err));
};

export const TemplateDelete = async (id: string) => {
	const headers = { "Content-Type": "application/json" };

	return api
		.delete(`/template/${id}`, { headers })
		.then((response) => response.data)
		.catch((err) => console.log(err));
};

export const TemplateFindAll = async (page?: number, signal?: AbortSignal) => {
	return api
		.get(`/templates${page ? "?page=" + page : ""}`, {
			signal, onDownloadProgress: (progressEvent) => {
				const { loaded, total, bytes } = progressEvent;
				store.dispatch(loaderState({ progress: Math.round((loaded / total) * 100), max: bytes, state: "templates" }));
			}
		})
		.then((response) => response.data)
		.catch((err) => console.log(err));
};

export const TemplateFindOne = async (id: string) => {
	return api
		.get(`/template/${id}`)
		.then((response) => response.data)
		.catch((err) => console.log(err));
};

export const TemplateCountPages = async () => {
	return api
		.get("/template/count")
		.then((response) => response.data)
		.catch((err) => console.log(err));
};
