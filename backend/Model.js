import { HTMLGenerator } from "./Schema/index.js";

export const AddTemplate = async (template_name, template_file, template_document_url, template_screenshot = null) => {
    try {
        const payload = {
            template_name,
            temaplte_html: template_file,
            template_document: template_document_url,
            template_screenshot,
        };

        return await HTMLGenerator.create(payload);
    } catch (err) {
        throw err.message;
    }
};
