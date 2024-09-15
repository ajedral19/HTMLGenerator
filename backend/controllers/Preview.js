import { HTMLGenerator } from "../Schema/index.js";

export const HandlePreview = async (req, res) => {
	const { id } = req.params;

	const template = await HTMLGenerator.findOne({ _id: id }, "template_preview");
	if (!template) return res.status(500).send("oops!");
	const html = Buffer.from(template.template_preview.buffer).toString("utf-8");
	return res.status(200).send(html);
};
