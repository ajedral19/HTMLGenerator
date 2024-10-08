import mongoose from "mongoose";
import { config } from "dotenv";

const env = config();

const { DATABASE_HOST, DATABASE_NAME } = env.parsed;

const MONGODB = `mongodb://${DATABASE_HOST}/${DATABASE_NAME}`;

const main = async () => {
	const uri = MONGODB;

	mongoose.connection
		.on("open", () => console.log("Database State", "Open"))
		.on("close", () => console.log("Database State", "Close"))
		.on("error", (err) => console.log("Database State", err));

	await mongoose.connect(uri);
};

main().catch((err) => console.error(err));

const { Schema, model } = mongoose;

const Document = new Schema({
	fieldname: { type: String },
	originalname: { type: String },
	enconding: { type: String },
	mimetype: { type: String },
	buffer: { type: Buffer },
	size: { type: Number },
});

const templatesSchema = new Schema({
	template_name: { type: String, required: true },
	// template_html: { type: Buffer, contentType: String, required: true },
	template_file: { type: Document, required: true },
	// template_preview: { type: String },
	template_preview: { type: Document, required: true },
	template_data_url: { type: String, required: true },
	template_cdn_url: { type: String },
	template_screenshot: { type: Buffer, contentType: String },
});

const HTMLGenerator = model("Template", templatesSchema);

export { HTMLGenerator };
