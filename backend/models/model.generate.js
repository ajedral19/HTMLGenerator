import { HTMLGenerator } from "../Schema/index.js";
import { get_sheet_id, handle_error, render_html } from "../utils.js";
import { Archive } from "../Utils/util.archive.js";
import { Extract } from "./model.spreadsheet.js";

export const Generate = async (template_id, spreadsheet, offset, limit) => {
	spreadsheet = get_sheet_id(spreadsheet);
	try {
		const data = await Promise.all([
			HTMLGenerator.findOne({ _id: template_id }, "template_file template_name"),
			Extract(spreadsheet, offset, limit),
		])
			.then((values) => values)
			.catch((err) => {
				return handle_error(err);
			});

		const [template, contents] = data;

		// if (!template) return null;
		if (contents.error) return contents;

		const archive = new Archive();
		const { rows } = contents;

		const buffer = Buffer.from(template.template_file.buffer);
		const html = buffer.toString("utf-8");
		let index = offset || 1;

		for (let n = 1; n <= rows.length; n++) {
			const render = render_html(html, rows[n - 1]);

			archive.append(render, `${index}.html`);

			index += 1;
		}

		return { name: template.template_name, archive: archive.finalize() };
	} catch (err) {
		return handle_error(err);
	}
};
