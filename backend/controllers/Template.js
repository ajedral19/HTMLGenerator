import { AddTemplate, DeleteTemplate, GetAllTemplates, GetScreenshot, GetTemplate, GetTemplatePreview } from "../Model.js";
import { extract_sheet, get_sheet_id, response_handler, template_uri } from "../utils.js";
// import { CaptureHTML } from "../utils.js";

export const TemplateAdd = async (req, res) => {
    const { name, template, sheet, cdn } = req.body;

    if (!name || !template || !sheet || !cdn) return res.status(404).json({ message: "cannot proceed to register" });

    const stored_template = await AddTemplate(name, template, sheet, cdn);
    return res.status(200).json({ message: "register", data: stored_template });
};

export const TemplateDelete = async (req, res) => {
    const { id } = req.params;
    const template = await DeleteTemplate(id);
    return res.status(200).json({ message: `template "${template.template_name}" has been deleted` });
};

export const TemplteGetAll = async (req, res) => {
    const data = await GetAllTemplates();

    return response_handler(200, "", { rows: data, rowCount: data.length })(res);
};

export const TemplateGetOne = async (req, res) => {
    const { id } = req.params;
    const data = await GetTemplate(id);

    return response_handler(200, "", { row: data })(res);
};

export const TemplatePreview = async (req, res) => {
    const { id } = req.params;
    const data = await GetTemplatePreview(id);
    return response_handler(200, "", { row: data })(res);
};

export const ExtractSheet = async (req, res) => {
    const { spreadsheet: google_sheet } = req.query;
    console.log(google_sheet);

    const sheet_id = get_sheet_id(google_sheet);
    const data = await extract_sheet(sheet_id);

    return response_handler(200, "", { rows: data, rowCount: data.length })(res);
};

export const TemplateScreenshot = async (req, res) => {
    const { id } = req.params;
    const data = await GetScreenshot(id);
    return res.status(200).setHeader("content-type", "image/webp").send(data);
};
// generate screenshot
