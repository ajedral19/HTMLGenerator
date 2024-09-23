import { Extract } from "./models/model.spreadsheet.js";
import { HTMLGenerator } from "./Schema/index.js";
import {
	buffer_to_string,
	capture_template,
	get_sheet_id,
	render_html,
	response_handler,
	template_uri,
} from "./utils.js";

// setters
export const AddTemplate = async (template_name, template, sheet_url, cdn_uri) => {
	try {
		// const template_html = buffer_to_string(template_file, true);
		const template_file = template;
		const document_id = get_sheet_id(sheet_url);
		const document_data = await Extract(document_id, 1, 1);
		const html_buffer = Buffer.from(template_file.buffer);
		const template_html = html_buffer.toString("utf-8");

		const rendered_html = render_html(template_html, document_data[0]);

		if (rendered_html) {
			const screenshot = await capture_template(rendered_html, cdn_uri);

			const payload = {
				template_name,
				template_file,
				template_preview: { ...template_file, buffer: Buffer.from(rendered_html, "utf-8") },
				template_data_url: sheet_url,
				template_screenshot: screenshot,
			};

			await HTMLGenerator.create(payload);

			return true;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
};

// removers
export const DeleteTemplate = async (id) => {
	try {
		return await HTMLGenerator.findByIdAndDelete({ _id: id });
	} catch (err) {
		console.log(err.name);
		console.log(err.message);
		return false;
	}
};

// getters
export const GetAllTemplates = async (page = 1, limit = 10) => {
	page = parseInt(page);
	const offset = page <= 1 ? 0 : (page - 1) * limit;
	console.log(`page: ${page}`, `offset :${offset}`);

	// curpage = 1, limit = 3 [expected result: items 0-2]
	// curpage = 2, limit = 3 [expected result: items 3-5]
	// so on

	try {
		const rows = await HTMLGenerator.find({}).skip(offset).limit(limit);
		// const uri = req ? template_uri(req) : null;

		const templates = rows.map((row) => {
			const { id, template_name: name, template_document: sheet } = row;
			const html = template;
			return { id, name, sheet };
		});

		return templates;
		// return response_handler(1, "", { templates: [...templates] });
	} catch (err) {
		console.log(err);

		return false;
		// return response_handler(0, err.message);
	}
};

export const GetTemplate = async (template_id) => {
	try {
		const row = await HTMLGenerator.findOne({ _id: template_id });

		const {
			id,
			template_name: name,
			template_html: template,
			template_preview: mockup,
			template_document: sheet,
		} = row;
		return {
			id,
			name,
			template,
			mockup,
			sheet,
		};
	} catch (err) {
		return false;
	}
};

export const GetTemplatePreview = async (id) => {
	try {
		const template = await HTMLGenerator.findById({ _id: id }, "template_preview template_name");

		let html = template.template_preview;
		html = Buffer.from(html.buffer);
		html = html.toString("utf-8");

		if (!html) return { status: 400, html: "<pre>no content</pre>" };
		return { status: 200, html };
		// once rendered, create cache for faster loading
	} catch (err) {
		if (err.name.toLowerCase() === "casterror") return { status: 400, html: "<pre>Oops! invalid template id.</pre>" };
		if (err.name.toLowerCase() === "typeerror") return { status: 404, html: "<pre>Oops! Template not found.</pre>" };
		return { status: 500, html: `<pre> ${err.name} ${err.message}</pre>` };
	}
};

export const GetScreenshot = async (id = null, buffer = null) => {
	let img;
	if (!id && buffer) {
		img = buffer;
	} else {
		const template = await HTMLGenerator.findOne({ _id: id }, "template_screenshot");
		img = template?.template_screenshot;
	}
	// handle error
	return img;
};

export const GetCount = async () => {
	return await HTMLGenerator.countDocuments();
};

// ```
// getting n of pages
// client must decide how much it can handle
// server returns the total count of documents and pages based on the input

// ```
