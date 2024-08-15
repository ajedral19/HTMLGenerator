import { AddTemplate, DeleteTemplate, GetAllTemplates, GetTemplate } from "../Model.js";
// import { CaptureHTML } from "../utils.js";

export const TemplateAdd = async (req, res) => {
    const { name, template, sheet } = req.body;
    // const img = await CaptureHTML(file, "1-VH-PUDKBmF5R7j_BTrb32dMLXlZJqjNR6GjzK3a9qE");
    // let buff = Buffer.from(img, "base64");
    console.log(template);

    const payload = {
        template_name: name,
        template_html: template,
        template_document: sheet,
        // template_screenshot: buff,
    };
    const stored_template = await AddTemplate(name, template, sheet);
    return res.status(200).json({ message: "register", data: stored_template });
};

export const TemplateDelete = async (req, res) => {
    const { id } = req.params;
    const template = await DeleteTemplate(id);
    return res.status(200).json({ message: `template "${template.template_name}" has been deleted` });
};

export const TemplteGetAll = async (req, res) => {
    const templates = await GetAllTemplates();

    res.status(200).json({ data: templates });
};

export const TemplatePreview = async (req, res) => {
    const { id } = req.params;
    const template = await GetTemplate(id);
    return res.status(200).json({ template });
};

// generate screenshot
