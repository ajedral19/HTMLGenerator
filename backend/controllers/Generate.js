import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { HTMLGenerator } from "../Schema/index.js";
import archiver from "archiver";
import { archiveIt, extractSheet } from "../utils.js";

// import credentials from "../html-generator-422807-694910701fb2.json" with { type: "json" };



// -----------------------
const get_file_path = (localdir) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filepath = path.join(__dirname, localdir);

    return filepath;
};

// store files
const storeHTML = (template_name, file, file_name) => {
    fs.existsSync(get_file_path(`../Template/${template_name}`)) || fs.mkdirSync(get_file_path(`../Template/${template_name}`));
    const dirpath = get_file_path(`../Template/${template_name}/${file_name}.html`);
    fs.writeFile(dirpath, file, (err) => err && console.log(err.message));
    // console.log('okay');
};

// compiler
const compileHTML = async (html, data) => {
    const template = Handlebars.compile(html);
    let files = [];
    data.forEach((row, n) => {
        const document = template(row);
        files = [...files, document];
        // const dirpath = get_file_path(`../Template/test_file.zip`);
        // fs.writeFile(dirpath, row, (err) => err && console.log(err.message));

        storeHTML("sample template exports", document, n);
    });
};

// const archiveIt = (html, data) => {
//     const template = Handlebars.compile(html);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     archive.on("warning", (err) => {
//         if (err.code === "ENOENT") {
//             console.log(err.message);
//         } else {
//             console.error(err.message);
//             throw err;
//         }
//     });

//     archive.on("error", (err) => {
//         console.error(err.message);
//         throw err;
//     });

//     data.forEach((row, n) => {
//         const compiled_html = template(row);
//         archive.append(compiled_html, { name: `${n}.html` });
//         // archive.file(compiled_html, { name: `${n}.html` });
//     });
//     archive.directory("subdir/", "new-subdir");
//     archive.directory("subdir/", false);

//     archive.finalize();
//     return archive;
// };

// make file zip
const zipIt = () => {
    const __dirname = get_file_path("../Template");

    // const output = fs.createWriteStream(__dirname + "/testzip.zip");
    const archive = archiver("zip", {
        zlib: { level: 9 },
    });

    // output.on("close", () => {
    //     console.log(archive.pointer() + "total bytes");
    //     console.log("archiving has been finalized and the output file has closed");
    // });

    // output.on("end", () => {
    //     console.log("Data has been drained");
    // });

    archive.on("warning", (err) => {
        if (err.code === "ENOENT") {
            console.log("some warning");
        } else {
            console.log(err.message);
            throw err;
        }
    });

    archive.on("error", (err) => {
        console.log(err.message);
        throw err;
    });

    // archive.pipe(output);

    const file1 = __dirname + "/index.html";
    archive.append(fs.createReadStream(file1), { name: "index.html" });

    archive.append("string chese!", { name: "index.html" });

    const buffer3 = Buffer.from("buff it!");
    archive.append(buffer3, { name: "index.html" });

    archive.file("file1.txt", { name: "index.html" });

    archive.directory("subdir/", "new-subdir");

    archive.directory("subdir/", false);

    archive.glob("file*.txt", { cwd: __dirname });

    archive.finalize();

    return archive;
};

// new generator
export const Generator = async (req, res) => {
    const { template_id = null, sheet_id = null } = req.body;

    try {
        const sheetData = await extractSheet(sheet_id);

        // sheet data
        // console.log(sheetData);
        // return
        // const id = new ObjectId
        const template = await HTMLGenerator.findOne({ _id: template_id }, "template_html");
        // console.log(template)
        // const template = await HTMLGenerator.findById(template_id, "template_html");
        // return

        let base64 = Buffer.from(template.template_html);
        base64 = base64.toString("latin1");
        base64 = base64.replace("data:text/html;base64,", "");
        const html = atob(base64);

        const archive = archiveIt(html, sheetData);

        res.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Disposition": "attachment; textbook.zip",
        });
        archive.pipe(res);
    } catch (err) {
        console.log(err.message);
    }

    // const readStream = fs.createReadStream(archive);
    // readStream.pipe(res);
};

// generate html files
export const Generate = async (req, res) => {
    const { template_id = null, sheet_id = null } = req.body;
    const rows = await extractSheet(sheet_id);

    const filepath = get_file_path("../template/index.html");
    const source = fs.readFileSync(filepath);

    const html = source.toString("latin1");
    const template = Handlebars.compile(html);

    const data = [
        { name: "Jane Doe", company: "Kigwaxkie" },
        { name: "Johny Papa", company: ["Kigwaxkie", "sdsfdf"] },
    ];

    data.forEach((item, n) => {
        const contents = template(item);
        const template_path = get_file_path(`../Template/somename${n}.html`);
        fs.writeFile(template_path, contents, (err) => err && console.log(err.message));
    });

    res.status(rows ? 200 : 500).send({ message: !rows ? "oops! we encountered some errors" : "temlpate is now available to download" });
};

// download file
export const DownloadFile = (req, res) => {
    const filepath = get_file_path("../path/to/archive.html");
    const stat = fs.statSync(filepath);
    let fname = req.params.id;

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": "attachment; filename=" + fname + ".html",
        "Content-Length": stat.size,
    });

    const readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
};
