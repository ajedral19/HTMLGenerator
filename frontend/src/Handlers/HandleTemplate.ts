import { error } from "console";
import { api } from "./handle.config";

type Template = {
	template: string | unknown;
	name: string;
	sheet: string;
	cdn: string;
};

export const TemplateSave = async (template_prop: Template) => {
	const { template, name, sheet, cdn } = template_prop;
	const headers = { "Content-Type": "multipart/form-data" };
	const payload = {
		template,
		name,
		sheet,
		cdn,
	};

	return api
		.post("/template/add", payload, { headers })
		.then((response) => response.data)
		.catch((err) => err);
};

export const TemplateDelete = async (id: string) => {
	const headers = { "Content-Type": "application/json" };

	return api
		.delete(`/template/${id}`, { headers })
		.then((response) => response.data)
		.catch((err) => err);
};

export const TemplateFindAll = async (page?: number) => {
	return api
		.get(`/templates${page ? "?page=" + page : ""}`)
		.then((response) => response.data)
		.catch((err) => err);
};

export const TemplateFindOne = async (id: string) => {
	return api
		.get(`/template/${id}`)
		.then((response) => response.data)
		.catch((err) => err);
};

export const TemplateCountPages = async () => {
	return api
		.get("/template/count")
		.then((response) => response.data)
		.catch((err) => err);
};
