import { HTMLGenerator } from "../Schema/index.js";
// import { CaptureHTML } from "../utils.js";

export const SaveTemplate = async (req, res) => {
    const { name, file, url } = req.body;

    // const img = await CaptureHTML(file, "1-VH-PUDKBmF5R7j_BTrb32dMLXlZJqjNR6GjzK3a9qE");
    // let buff = Buffer.from(img, "base64");

    // console.log(buff);
    // return;

    const payload = {
        template_name: name,
        template_html: file,
        template_document: url,
        // template_screenshot: buff,
    };
    try {
        const template = await HTMLGenerator.create(payload);
        return res.status(200).json({ message: "register", data: template });
    } catch (err) {
        console.log(err.message);
    }
};

export const StoreShot = () => {
    // const screenshot = CaptureHTML(file, "1-VH-PUDKBmF5R7j_BTrb32dMLXlZJqjNR6GjzK3a9qE");
};

export const DeleteTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const templates = await HTMLGenerator.findOneAndDelete({ _id: id });
        if (!templates) return res.status(204);

        return res.status(200).json({ message: `template "${templates.template_name}" has been deleted` });
    } catch (err) {
        return res.status(500).json({ message: `${err.message}` });
    }
};

export const UpdateTemplate = async (req, res) => {};

export const DownloadTemplate = (req, res) => {};

const _FetchTemplates = async () => {
    return await HTMLGenerator.find({}, {template_html: 0});
};

export const GetTemplates = async (req, res) => {
    const templates = await _FetchTemplates();
    res.json({ data: templates });
};

export const Paginate = async (req, res) => {};

export const SocketGetTemplates = async () => {
    const templates = await _FetchTemplates();

    return { data: templates || [] };
};

// generate screenshot
