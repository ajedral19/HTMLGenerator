import mongoose from "mongoose";

// const MONGODB = "mongodb://0.0.0.0:27017/HTMLGenerator";
const MONGODB = "mongodb://mongodb:27017/new-html-generator";

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
    template_document: { type: String, required: true },
    template_screenshot: Buffer,
});

const HTMLGenerator = model("Template", templatesSchema);

export { HTMLGenerator };
