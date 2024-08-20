import mongoose from "mongoose";
import { config } from "dotenv";

const env = config();

const { DBNAME, DBHOST, DBPORT } = env.parsed;

// const db_name = DBNAME || "HTMLGenerator";
// const db_host = DBHOST || "0.0.0.0";
// const db_port = DBPORT || "27017";
// const MONGODB = `mongodb://${db_host}:${db_port}/${db_name}`;
// const dbName = "new-html-generator"
// const MONGODB = "mongodb://0.0.0.0:27017/HTMLGenerator";
const MONGODB = "mongodb://mongo-db/HTMLGenerator";

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

const templatesSchema = new Schema({
	template_name: { type: String, required: true },
	template_html: { type: Buffer, contentType: String, required: true },
	template_preview: { type: String },
	template_document: { type: String, required: true },
	template_screenshot: { type: Buffer, contentType: String },
});

const HTMLGenerator = model("Template", templatesSchema);

export { HTMLGenerator };
