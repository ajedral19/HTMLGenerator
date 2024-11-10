import { GetCount } from "../Model.js";
import {
	ArchiveTemplate,
	TemplateDeleteOne,
	TemplatePreview,
	TemplatesAddOne,
	TemplateScreenshot,
	TemplatesFind,
	TemplatesFindOne,
} from "../models/model.templates.js";
import { get_random_sheet, get_sheet_id, response_handler, template_uri } from "../utils.js";
import { Extract, SheetCount } from "../models/model.spreadsheet.js";
import { Generate } from "../models/model.generate.js";

export const TemplateStylesheetUpload = async (req, res) => {};

export const TemplateAdd = async (req, res) => {
	console.log("testing");

	const formData = req.body;
	const template = req.file;
	const { name, sheet, cdn } = formData;

	if (!name || !template || !sheet || !cdn) return res.status(404).json({ message: "cannot proceed to register" });
	const payload = { name, template, sheet, cdn };
	const new_template = await TemplatesAddOne(payload);

	if (new_template?.error) {
		const { error, message, status } = new_template;
		return response_handler(status, null, { error, message })(res);
	}
	return response_handler(200, null, {
		id: new_template.id,
		name: new_template.name,
		sheet: new_template.sheet,
		cdn: new_template.cdn,
	})(res);
};

export const TemplateDelete = async (req, res) => {
	const { template_id } = req.params;
	const template = await TemplateDeleteOne(template_id);

	if (template?.error) {
		const { error, message, status } = template;
		return response_handler(status, null, { error, message })(res);
	}
	return response_handler(204, null, null)(res);
};

export const TemplteGetAll = async (req, res) => {
	let { page, archived } = req.query;
	page = isNaN(page) ? 1 : parseInt(page);
	console.log(archived, typeof archived);
	
	archived = typeof archived === "boolean" ? archived : false;
	const templates = await TemplatesFind(parseInt(page), 10, archived);

	if (templates?.error) {
		const { error, message, status } = templates;
		return response_handler(status, null, { error, message })(res);
	}

	response_handler(200, null, { rows: templates.rows, rowCount: templates.rows.length })(res);
};

export const TemplateGetOne = async (req, res) => {
	const { template_id } = req.params;
	const template = await TemplatesFindOne(template_id);

	if (template?.error) {
		const { error, message, status } = template;
		return response_handler(status, null, { error, message })(res);
	}

	response_handler(200, null, { rows: template.rows, rowCount: template.rows.length })(res);
};

export const TemplateGetPreview = async (req, res) => {
	const { id } = req.params;
	const preview = await TemplatePreview(id);

	if (preview?.error) {
		const { error, status, message } = preview;
		res.setHeader("Content-Type", "application/json");
		return response_handler(status, null, { error, message })(res);
	}

	res.set({
		"Content-Type": "text/html",
		"Content-Disposition": `inline;filename=${preview.name}.html`,
	});
	return res.status(200).send(preview.html);
};

export const ExtractSheet = async (req, res) => {
	const { spreadsheet: google_sheet } = req.query;
	let { offset, limit } = req.query;

	offset = isNaN(offset) ? 1 : parseInt(offset);
	limit = isNaN(limit) ? 1 : parseInt(limit);

	const sheet_id = get_sheet_id(google_sheet);
	const sheet = await Extract(sheet_id, offset, limit);

	if (sheet?.error) {
		const { error, status, message } = sheet;
		return response_handler(status, null, { error, message })(res);
	}

	return response_handler(200, null, { rows: sheet.rows, rowCount: sheet.rowCount })(res);
};

export const CountSheets = async (req, res) => {
	const { spreadsheet: google_sheet } = req.query;
	const sheet_id = get_sheet_id(google_sheet);
	const sheet = await SheetCount(sheet_id);

	if (sheet?.error) {
		const { error, status, message } = sheet;
		return response_handler(status, null, { error, message })(res);
	}

	return response_handler(200, null, { sheetsCount: sheet.count })(res);
};

export const TemplateGetScreenshot = async (req, res) => {
	const { template_id } = req.params;
	const screenshot = await TemplateScreenshot(template_id);

	if (screenshot?.error) {
		const { error, status, message } = screenshot;
		res.setHeader("Content-Type", "application/json");
		return response_handler(status, null, { error, message })(res);
	}

	res.set({
		"Content-Type": "image/webp",
		"Content-Disposition": `inline;filename=${screenshot.name}.webp`,
	});

	return res.status(200).send(screenshot.image);
};

export const TemplateGenerate = async (req, res) => {
	let { offset, limit, spreadsheet } = req.query;
	const { template_id } = req.params;
	offset = isNaN(offset) ? 1 : parseInt(offset);
	limit = isNaN(limit) ? 10 : parseInt(limit);
	const generate = await Generate(template_id, spreadsheet, offset, limit);

	if (generate.error) {
		const { error, status, message } = generate;
		return response_handler(status, null, { error, message })(res);
	}

	const { name, archive } = generate;

	res.writeHead(200, {
		"Content-Type": "application/zip",
		"Content-Disposition": "attachment;" + name + ".zip",
	});

	archive.pipe(res);
};

export const TemplateArchive = async (req, res) => {
	const { id } = req.params;
	const test = await ArchiveTemplate(id);

	return response_handler(200, null, { test })(res);
};

// unknow yet
export const TemplateCount = async (req, res) => {
	const count = await GetCount();
	console.log(count);

	return res.status(200).send("okay");
};
