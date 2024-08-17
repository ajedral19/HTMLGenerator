import { GoogleSpreadsheet } from "google-spreadsheet";
// import captureWebsite from "capture-website";
import { JWT } from "google-auth-library";
import { config } from "dotenv";
import archiver from "archiver";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import path, { join, dirname, resolve } from "path";

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
export const archive_it = (html, data) => {
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

	data.forEach((row, n) => {
		const compiled_html = render_html(html, row);
		if (compiled_html) archive.append(compiled_html, { name: `${n + 1}.html` });
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

	const document = Handlebars.compile(template);
	html = document(data);

	return html;
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
	base64 = base64.toString("utf8");
	base64 = base64.replace("data:text/html;base64,", "");
	const html = atob(base64);

	return html;
};

/**
 *
 * @param {string} sheet_id
 * @returns Promise | null
 */
export const extract_sheet = async (sheet_id) => {
	let response = null;
	try {
		const doc = new GoogleSpreadsheet(sheet_id, serviceAccountAuth);
		await doc.loadInfo();

		let result = [];
		const sheet_count = doc.sheetCount;

		for (let n = 0; n < sheet_count; n++) {
			const sheet = doc.sheetsByIndex[n];

			const rows = await sheet.getRows({ offset: 0 });

			let content = {};
			rows.forEach((row) => {
				let values = row._rawData;
				let key = values.shift();
				content[key] = values;
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

export const capture_template = async (html) => {
	if (!html) return null;

	try {
		const browser = await puppeteer.launch({
			headless: "new",
			defaultViewport: {
				height: 1920,
				width: 1080,
			},
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
		return Buffer.from(buffer, 'base64');
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
