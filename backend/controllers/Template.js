import { HTMLGenerator } from "../Schema/index.js";

export const SaveTemplate = async (req, res) => {
    const { name, file, url } = req.body;

    const payload = {
        template_name: name,
        template_html: file,
        template_document: url,
        template_screenshot: null,
    };

    try {
        const template = await HTMLGenerator.create(payload);
        return res.status(200).json({ message: "register", data: template });
    } catch (err) {
        console.log(err.message);
    }
};

export const GetTemplates = async (req, res) => {
    const templates = await HTMLGenerator.find();
    console.log({data: templates})
    res.json({ data: templates });
};

export const SocketGetTemplates = async () => {
    const templates = await HTMLGenerator.find();

    return { data: templates };
};
