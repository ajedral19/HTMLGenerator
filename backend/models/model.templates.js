import { HTMLGenerator } from "../Schema/index.js";
import { capture_template, get_offset, get_sheet_id, handle_error, render_html } from "../utils.js";
import { Extract } from "./model.spreadsheet.js";

/**
 *
 * @param {object} template_data
 * @returns
 */
export const TemplatesAddOne = async (template_data) => {
	try {
		const { name = undefined, template = undefined, sheet = undefined, cdn = undefined } = template_data;

		const spreadsheet = get_sheet_id(sheet);
		const buffer = Buffer.from(template.buffer);
		const contents = await Extract(spreadsheet, 1, 1);
		const html = buffer.toString("utf-8");

		const render = render_html(html, contents.rows[0], cdn);
		// if (render?.error) return handle_error(render.error);

		const screenshot = await capture_template(render);

		const payload = {
			template_name: name,
			template_file: template,
			template_preview: { ...template, buffer: render },
			template_screenshot: screenshot,
			template_data_url: sheet,
			template_cdn_url: cdn,
		};

		const new_template = await HTMLGenerator.create(payload);
		const new_template_id = new_template.get("_id");

		return { name, sheet, cdn, id: new_template_id };
	} catch (err) {
		return handle_error(err);
	}
};

/**
 *
 * @param {string} template_id
 * @returns
 */
export const TemplateDeleteOne = async (template_id) => {
	try {
		const template = await HTMLGenerator.findByIdAndDelete({ _id: template_id });

		return {
			id: template.get("_id"),
			name: template.get("template_name"),
			sheet: template.get("template_data_url"),
			cdn: template.get("template_cdn_url"),
		};
	} catch (err) {
		return handle_error(err);
	}
};

/**
 *
 * @param {number} page
 * @param {number} limit
 * @returns
 */
export const TemplatesFind = async (page = 1, limit = 10, archived = false) => {
	const offset = get_offset(page, limit);
	try {
		const rows = await HTMLGenerator.find({ template_archived: archived }).skip(offset).limit(limit);
		const data = rows.map((row) => {
			const {
				id,
				template_name: name,
				template_data_url: spreadsheetURL,
				template_screenshot,
				template_archived,
			} = row;
			return {
				data: {
					id,
					// name,
					// author: "",
					// ticket: "",
					// spreadsheetURL,
					// isFavorite: false,
					// image: template_screenshot,
					archived: typeof template_archived !== 'boolean' ? null : template_archived,
				},
			};
		});

		return { rows: [...data] };
	} catch (err) {
		return handle_error(err);
	}
};

/**
 *
 * @param {string} template_id
 * @returns
 */
export const TemplatesFindOne = async (template_id) => {
	try {
		const row = await HTMLGenerator.findOne({ _id: template_id });
		const { id, template_name: name, template_data_url: sheet, template_cdn_url: cdn, template_archived } = row;
		return { rows: [{ id, name, sheet, cdn, template_archived }] };
	} catch (err) {
		return handle_error(err);
	}
};

/**
 *
 * @param {string} template_id
 * @returns
 */
export const TemplateScreenshot = async (template_id) => {
	try {
		const template = await HTMLGenerator.findOne({ _id: template_id }, "template_screenshot template_name");
		return {
			name: template.template_name,
			image: template.template_screenshot,
		};
	} catch (err) {
		return handle_error(err);
	}
};

/**
 *
 * @param {string} template_id
 * @returns
 */
export const TemplatePreview = async (template_id) => {
	try {
		const template = await HTMLGenerator.findOne({ _id: template_id }, "template_preview template_name");
		const buffer = Buffer.from(template.template_preview.buffer);
		const html = buffer.toString("utf-8");

		return { name: template.template_name, html };
	} catch (err) {
		return handle_error(err);
	}
};

export const ArchiveTemplate = async (id) => {
	try {
		const template = await HTMLGenerator.findOneAndUpdate({ _id: id }, [
			{
				$set: {
					template_archived: {
						$eq: [false, "$template_archived"],
					},
				},
			},
		]);
		return { name: template.template_name, is_archived: !template.template_archived };
	} catch (err) {
		return handle_error(err);
	}
};
