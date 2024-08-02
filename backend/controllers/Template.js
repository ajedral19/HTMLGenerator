import { HTMLGenerator } from "../Schema/index.js";
import { CaptureHTML } from "../utils.js";

export const SaveTemplate = async (req, res) => {
    const { name, file, url } = req.body;

    const payload = {
        template_name: name,
        template_html: file,
        template_document: url,
        template_screenshot: null,
    };
    CaptureHTML(file, url);
    try {
        const template = await HTMLGenerator.create(payload);
        return res.status(200).json({ message: "register", data: template });
    } catch (err) {
        console.log(err.message);
    }
};

export const DeleteTemplate = async (req, res) => {
    const templates = await HTMLGenerator.findOneAndDelete();
    return res.send(templates);
};

export const UpdateTemplate = async (req, res) => {};

export const DownloadTemplate = (req, res) => {};

export const GetTemplates = async (req, res) => {
    const templates = await HTMLGenerator.find();
    res.json({ data: templates });
};

export const Paginate = async (req, res) => {};

export const SocketGetTemplates = async () => {
    const templates = await HTMLGenerator.find();

    return { data: templates };
};

// generate screenshot
