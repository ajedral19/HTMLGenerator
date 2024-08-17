import { HTMLGenerator } from "./Schema/index.js";
import {
	buffer_to_string,
	capture_template,
	extract_sheet,
	get_sheet_id,
	render_html,
	response_handler,
} from "./utils.js";

// setters
export const AddTemplate = async (template_name, template_file, template_document_url) => {
	try {
		const template_html = buffer_to_string(template_file, true);
		const document_id = get_sheet_id(template_document_url);
		const document_data = await extract_sheet(document_id);
		const rendered_html = render_html(template_html, document_data[0]);

		if (rendered_html) {
			const screenshot = await capture_template(rendered_html);

			const payload = {
				template_name,
				template_html: template_file,
				template_preview: rendered_html,
				template_document: template_document_url,
				template_screenshot: screenshot,
			};

			const template = await HTMLGenerator.create(payload);

			return response_handler(1, `${template.template_name} is now added`);
		}
	} catch (err) {
		return response_handler(0, err.message);
	}
};

// removers
export const DeleteTemplate = async (id) => {
	return await HTMLGenerator.findByIdAndDelete({ _id: id });
};

// getters
export const GetAllTemplates = async () => {
	try {
		const rows = await HTMLGenerator.find({});

		const templates = rows.map((row) => {
			const base64 = row.template_screenshot ? row.template_screenshot.toString("base64") : "";

			const {
				_id: id,
				template_name: name,
				template_html: template,
				template_preview: mockup,
				template_document: sheet,
				template_screenshot: screenshot,
			} = row;
			const html = buffer_to_string(template);
			return { id, name, template: html, mockup, sheet, screenshot: base64 };
		});

		return response_handler(1, "", { templates: [...templates] });
	} catch (err) {
		return response_handler(0, err.message);
	}
};

export const GetTemplate = async (template_id) => {
	try {
		const row = await HTMLGenerator.findOne({ _id: template_id });

		const {
			_id: id,
			template_name: name,
			template_html: template,
			template_preview: mockup,
			template_document: sheet,
		} = row;
		const html = buffer_to_string(template);

		return response_handler(1, "", {
			id,
			name,
			template: html,
			mockup,
			sheet,
		});
	} catch (err) {
		return response_handler(0, err.message);
	}
};

export const GetTemplatePreview = async (id) => {
	const template = await HTMLGenerator.findOne({ _id: id }, "template_html template_document");

	const sheet_id = get_sheet_id(template.template_document);
	const html = buffer_to_string(template.template_html);
	const data = await extract_sheet(sheet_id);

	const rendered = render_html(html, data[0]);

	if (rendered) return { template: rendered };

	// once rendered, create cache for faster loading
};
