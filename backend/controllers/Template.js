import { AddTemplate, DeleteTemplate, GetAllTemplates, GetTemplate, GetTemplatePreview } from "../Model.js";
import { extract_sheet, get_sheet_id } from "../utils.js";
// import { CaptureHTML } from "../utils.js";

export const TemplateAdd = async (req, res) => {
    const { name, template, sheet } = req.body;
    // const img = await CaptureHTML(file, "1-VH-PUDKBmF5R7j_BTrb32dMLXlZJqjNR6GjzK3a9qE");
    // let buff = Buffer.from(img, "base64");
    // console.log(template);

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

export const TemplateGetOne = async (req, res) => {
    const { id } = req.params;
    const template = await GetTemplate(id);
    return res.status(200).json({ data: template });
};

export const TemplatePreview = async (req, res) => {
    const { id } = req.params;
    const template = await GetTemplatePreview(id);
    return res.status(200).json(template);
};

export const ExtractSheet = async (req, res) => {
    const { "google-sheet": google_sheet } = req.headers;
    const sheet_id = get_sheet_id(google_sheet);
    const data = await extract_sheet(sheet_id);
    return res.status(200).json({ data });

    // extract_sheet()
};

// generate screenshot
