import { HTMLGenerator } from "./Schema/index.js";
import { buffer_to_string, capture_template, extract_sheet, get_sheet_id, render_html, response_handler, template_uri } from "./utils.js";

// setters
export const AddTemplate = async (template_name, template, sheet_url) => {
    try {
        // const template_html = buffer_to_string(template_file, true);
        const template_html = template;
        const document_id = get_sheet_id(sheet_url);
        const document_data = await extract_sheet(document_id);
        const rendered_html = render_html(template_html, document_data[0]);

        if (rendered_html) {
            const screenshot = await capture_template(rendered_html);

            const payload = {
                template_name,
                template_html,
                template_preview: rendered_html,
                template_document: sheet_url,
                template_screenshot: screenshot,
            };

            const template = await HTMLGenerator.create(payload);

            return true;
        }
    } catch (err) {
        return false;
    }
};

// removers
export const DeleteTemplate = async (id) => {
    return await HTMLGenerator.findByIdAndDelete({ _id: id });
};

// getters
export const GetAllTemplates = () => async (uri) => {
    try {
        const rows = await HTMLGenerator.find({});
        // const uri = req ? template_uri(req) : null;

        const templates = rows.map((row) => {
            const { id, template_name: name, template_html: template, template_preview: mockup, template_document: sheet } = row;
            const html = template;
            return { id, name, template: html, mockup, sheet, screenshot: `${uri}/${id}/screenshot` };
        });

        return templates;
        // return response_handler(1, "", { templates: [...templates] });
    } catch (err) {
        return false;
        // return response_handler(0, err.message);
    }
};

export const GetTemplate = async (template_id) => {
    try {
        const row = await HTMLGenerator.findOne({ _id: template_id });

        const { id, template_name: name, template_html: template, template_preview: mockup, template_document: sheet } = row;
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
    const template = await HTMLGenerator.findOne({ _id: id }, "template_html template_document template_name");

    const sheet_id = get_sheet_id(template.template_document);
    const html = template.template_html;
    const data = await extract_sheet(sheet_id);
    const rendered = render_html(html, data[0]);

    if (!rendered) return false;
    return { id: template.id, name: template.template_name, template: rendered };

    // once rendered, create cache for faster loading
};

export const GetScreenshot = async (id = null, buffer = null) => {
    let img;
    if (!id && buffer) {
        img = buffer;
    } else {
        const template = await HTMLGenerator.findOne({ _id: id }, "template_screenshot");
        img = template.template_screenshot;
    }
    return img;
};
