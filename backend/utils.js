import { GoogleSpreadsheet } from "google-spreadsheet";
// import captureWebsite from "capture-website";
import { JWT } from "google-auth-library";
import { config } from "dotenv";
import archiver from "archiver";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import Mustache from "mustache";
import path, { join, dirname, resolve } from "path";
import { escape } from "querystring";

const env = config();

const { CLIENT_EMAIL, PRIVATE_KEY } = env.parsed;

const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// console.log(serviceAccountAuth);
export const response_handler = (status, message, data = null) => {
    return {
        status,
        message,
        ...data,
    };
};

/**
 *
 * @param {string} html
 * @param {object[]} data
 * @returns archive
 */
export const archive_it = (html, data, n_start = 1) => {
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("warning", (err) => {
        if (err.code === "ENOENT") {
            console.log(err.message);
        } else {
            console.error(err.message);
            throw err;
        }
    });

    archive.on("error", (err) => {
        console.error(err.message);
        throw err;
    });

    let chapter_n = 0;

    if (typeof n_start == "number") {
        chapter_n = n_start;
    }

    data.forEach((row) => {
        const compiled_html = render_html(html, row);
        if (compiled_html) archive.append(compiled_html, { name: `${chapter_n}.html` });
        chapter_n += 1;
        // archive.file(compiled_html, { name: `${n}.html` });
    });

    archive.directory("subdir/", "new-subdir");
    archive.directory("subdir/", false);
    archive.finalize();

    return archive;
};

/**
 *
 * @param {string} template
 * @param {object} data
 * @returns HTML || null
 */
export const render_html = (template, data) => {
    if (!template || !data) return null;
    let html = "";

    // Mustache.parse(template);

    // const document = Mustache.render(template, data);
    const document = Handlebars.compile(template);
    html = document(data);
    html = html.replaceAll(/\%.*_path%/g, "https://nativecamp-public-web-production.s3-ap-northeast-1.amazonaws.com/");

    // html = document;

    return decodeURIComponent(escape(html));
};

/**
 *
 * @param {Buffer} buffer
 * @returns HTML | null
 */
export const buffer_to_string = (buffer, is_base64 = false) => {
    if (!buffer) return null;
    let base64 = buffer;
    if (!is_base64) base64 = Buffer.from(buffer);
    base64 = base64.toString("utf-8");
    base64 = base64.replace("data:text/html;base64,", "");
    const html = atob(base64);
    const decoded_html = decodeURIComponent(escape(html));

    return decoded_html;
};

/**
 *
 * @param {string} sheet_id
 * @returns Promise | null
 */
export const extract_sheet = async (sheet_id, offset_start = 1, offset_end = 30) => {
    let response = null;
    try {
        const doc = new GoogleSpreadsheet(sheet_id, serviceAccountAuth);
        await doc.loadInfo();
        doc.sheetsApi();

        let result = [];
        const sheet_count = doc.sheetCount;

        const off_start = offset_start - 1;
        const off_end = offset_end > sheet_count ? sheet_count : offset_end;

        for (let n = off_start; n < off_end; n++) {
            console.log(n);

            const sheet = doc.sheetsByIndex[n];

            const rows = await sheet.getRows({ offset: 0 });

            let content = { item_number: n + 1 };
            rows.forEach((row, n, arr) => {
                let values = row._rawData;
                let key = values.shift();

                if (values.length > 1) {
                    content[key] = values.map((value, key) => {
                        return { key: key + 1, value };
                    });
                } else content[key] = values.toString();
            });

            result = [...result, content];

            response = result;
        }
    } catch (err) {
        console.error(err);
    }

    return response;
};

export const get_sheet_id = (url) => {
    const regex = new RegExp("(/d/.*/)");
    const finds = regex.exec(url);

    return finds && finds[0].replace("/d/", "").replace("/", "");
};

export const embed_css = () => {};

export const capture_template = async (html) => {
    if (!html) return null;
    html = html.replaceAll(/\%.*_path%/g, "https://nativecamp-public-web-production.s3-ap-northeast-1.amazonaws.com/");
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: {
                height: 1920,
                width: 1080,
            },
            // executablePath: "/usr/bin/chromium-browser",
            // args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox', '--no-zygote']
        });

        const page = await browser.newPage();
        await page.setContent(html, {
            waitUntil: "load",
            timeout: 30000,
        });
        const buffer = await page.screenshot({
            type: "webp",
            quality: 100,
        });

        await page.close();
        await browser.close();
        return Buffer.from(buffer, "base64");
    } catch (err) {
        console.log(err);
    }
};

// export const CaptureHTML = async (html, sheet_id) => {
//     const data = await extractSheet(sheet_id);

//     let base64 = html.replace("data:text/html;base64,", "");
//     const htm = atob(base64);
//     const compile = Handlebars.compile(htm);
//     const output = compile(data[0]);
//     // const img = await captureWebsite.file(output, { inputType: "html" });
//     try {
//         const img = await captureWebsite.buffer(output, { inputType: "html", type: "webp" });
//         return img;
//     } catch (err) {
//         console.log(err);
//     }

//     // todo - use panthomjs instead
// };
