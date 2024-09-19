import { AddTemplate, DeleteTemplate, GetAllTemplates, GetCount, GetScreenshot, GetTemplate, GetTemplatePreview } from "../Model.js";
import { TemplatesFind } from "../models/templates.model.js";
import { extract_sheet, get_random_sheet, get_sheet_id, response_handler, template_uri } from "../utils.js";
// import { CaptureHTML } from "../utils.js";

export const TemplateAdd = async (req, res) => {
    const formData = req.body;
    const template = req.file;
    const { name, sheet, cdn } = formData;

    if (!name || !template || !sheet || !cdn) return res.status(404).json({ message: "cannot proceed to register" });

    const stored_template = await AddTemplate(name, template, sheet, cdn);
    return res.status(200).json({ message: "register", data: stored_template });
};

export const TemplateDelete = async (req, res) => {
    const { template_id } = req.params;
    const template = await DeleteTemplate(template_id);
    return res.status(200).json({ message: `template "${template.template_name}" has been deleted` });
};

export const TemplteGetAll = async (req, res) => {
    const { page = 0 } = req.query;
    // const data = await GetAllTemplates(parseInt(page));
    const { success, rows, error = undefined, code: status_code = undefined } = await TemplatesFind(page);

    if (success) return response_handler(200, "", { rows, rowCount: 0 })(res);

    return response_handler(status_code, "", { error })(res);
};

export const TemplateGetOne = async (req, res) => {
    const { template_id } = req.params;
    const data = await GetTemplate(template_id);

    return response_handler(200, "", { row: data })(res);
};

export const TemplatePreview = async (req, res) => {
    const { id } = req.params;
    const data = await GetTemplatePreview(id);
    return response_handler(200, "", { row: data })(res);
};

export const ExtractSheet = async (req, res) => {
    const { spreadsheet: google_sheet } = req.query;

    const sheet_id = get_sheet_id(google_sheet);
    const data = await extract_sheet(sheet_id);

    return response_handler(200, "", { rows: data, rowCount: data.length })(res);
};

export const TemplateScreenshot = async (req, res) => {
    const { template_id } = req.params;
    const data = await GetScreenshot(template_id);
    return res.status(200).setHeader("content-type", "image/webp").send(data);
};
// generate screenshot

export const TemplateCount = async (req, res) => {
    const count = await GetCount();
    console.log(count);

    return res.status(200).send("okay");
};

// dummy controller
export const RandomSheet = async (req, res) => {
    const spreadsheet = "https://docs.google.com/spreadsheets/d/1CgbIAfjgW-P8Z6te2KKiIBuUftAuwdxk9RBydm3TZr0/edit?gid=1945486897#gid=1945486897";
    const sheet_id = get_sheet_id(spreadsheet);

    const sheet = await get_random_sheet(sheet_id);

    return res.status(200).json(sheet);
};
