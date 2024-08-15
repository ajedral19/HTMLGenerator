import { HTMLGenerator } from "./Schema/index.js";
import { bufferToString, extractSheet, get_sheet_id, renderHTML } from "./utils.js";

// setters
export const AddTemplate = async (template_name, template_file, template_document_url, template_screenshot = null) => {
    try {
        const payload = {
            template_name,
            template_html: template_file,
            template_document: template_document_url,
            template_screenshot,
        };

        return await HTMLGenerator.create(payload);
    } catch (err) {
        throw err.message;
    }
};

// removers
export const DeleteTemplate = async (id) => {
    return await HTMLGenerator.findByIdAndDelete({ _id: id });
};

// getters
export const GetAllTemplates = async () => {
    const rows = await HTMLGenerator.find({});

    return rows.map((row) => {
        const { _id: id, template_name: name, template_html: template, template_document: sheet } = row;
        const html = bufferToString(template);
        return {
            id,
            name,
            template: html,
            sheet,
        };
    });
};

export const GetTemplate = async (id) => {
    const template = await HTMLGenerator.findOne({ _id: id }, "template_html template_document");

    const sheet_id = get_sheet_id(template.template_document);
    const html = bufferToString(template.template_html);
    const data = await extractSheet(sheet_id);
    const rendered = renderHTML(html, data[0]);

    if (rendered) return { template: rendered };
};
