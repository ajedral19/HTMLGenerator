import { GetCount } from "../Model.js";
import {
	TemplateDeleteOne,
	TemplatePreview,
	TemplatesAddOne,
	TemplateScreenshot,
	TemplatesFind,
	TemplatesFindOne,
} from "../models/templates.model.js";
import { get_random_sheet, get_sheet_id, response_handler, template_uri } from "../utils.js";
import { Extract, SheetCount } from "../models/spreadsheet.model.js";
// import { CaptureHTML } from "../utils.js";

// <okay>
export const TemplateAdd = async (req, res) => {
	const formData = req.body;
	const template = req.file;
	const { name, sheet, cdn } = formData;

	if (!name || !template || !sheet || !cdn) return res.status(404).json({ message: "cannot proceed to register" });
	const payload = { name, template, sheet, cdn };
	const new_template = await TemplatesAddOne(payload);

	if (new_template.error) {
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

	if (template.error) {
		const { error, message, status } = template;
		return response_handler(status, null, { error, message })(res);
	}

	return response_handler(202, null, { message: "deleted", template })(res);
	// return should be 204 - no content
};

// <okay>
export const TemplteGetAll = async (req, res) => {
	const { page = 0 } = req.query;
	const templates = await TemplatesFind(page);

	if (templates.error) {
		const { error, message, status } = templates;
		return response_handler(status, null, { error, message })(res);
	}

	response_handler(200, null, { rows: templates.rows, rowCount: templates.rows.length })(res);
};

// <okay>
export const TemplateGetOne = async (req, res) => {
	const { template_id } = req.params;
	const template = await TemplatesFindOne(template_id);

	if (template.error) {
		const { error, message, status } = template;
		return response_handler(status, null, { error, message })(res);
	}

	response_handler(200, null, { rows: template.rows, rowCount: template.rows.length })(res);
};

// <okay>
export const TemplateGetPreview = async (req, res) => {
	const { id } = req.params;
	const preview = await TemplatePreview(id);

	if (preview.error) {
		const { error, status, message } = preview;
		res.setHeader("Content-Type", "application/json");
		return response_handler(status, null, { error, message })(res);
	}

	res.set({
		"Content-Type": "text/html",
		"Content-Disposition": `inline;filename=${preview.name}.html`,
	});
	return res.status(200).send(preview.html);
	// return response_handler(200, "", { row: data })(res);
};

// <okay>
export const ExtractSheet = async (req, res) => {
	const { spreadsheet: google_sheet } = req.query;
	let { offset, limit } = req.query;

	if (offset) offset = parseInt(offset);
	if (limit) limit = parseInt(limit);

	const sheet_id = get_sheet_id(google_sheet);
	const sheet = await Extract(sheet_id, offset, limit);

	if (sheet.error) {
		const { error, status, message } = sheet;
		return response_handler(status, null, { error, message })(res);
	}

	return response_handler(200, null, { rows: sheet.rows, rowCount: sheet.rowCount })(res);
};

// <okay>
export const CountSheets = async (req, res) => {
	const { spreadsheet: google_sheet } = req.query;
	const sheet_id = get_sheet_id(google_sheet);
	const sheet = await SheetCount(sheet_id);

	if (sheet.error) {
		const { error, status, message } = sheet;
		return response_handler(status, null, { error, message })(res);
	}

	return response_handler(200, null, { sheetsCount: sheet.count })(res);
};

// <okay>
export const TemplateGetScreenshot = async (req, res) => {
	const { template_id } = req.params;
	const screenshot = await TemplateScreenshot(template_id);

	if (screenshot.error) {
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
// generate screenshot

export const TemplateCount = async (req, res) => {
	const count = await GetCount();
	console.log(count);

	return res.status(200).send("okay");
};

// dummy controller
export const RandomSheet = async (req, res) => {
	const spreadsheet =
		"https://docs.google.com/spreadsheets/d/1CgbIAfjgW-P8Z6te2KKiIBuUftAuwdxk9RBydm3TZr0/edit?gid=1945486897#gid=1945486897";
	const sheet_id = get_sheet_id(spreadsheet);

	const sheet = await get_random_sheet(sheet_id);

	return res.status(200).json(sheet);
};
