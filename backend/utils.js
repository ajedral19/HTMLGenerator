import { GoogleSpreadsheet } from "google-spreadsheet";
import captureWebsite from "capture-website";
import { JWT } from "google-auth-library";
import { config } from "dotenv";
import archiver from "archiver";
import Handlebars from "handlebars";

const env = config();

const { CLIENT_EMAIL, PRIVATE_KEY } = env.parsed;

const serviceAccountAuth = new JWT({
	email: CLIENT_EMAIL,
	key: PRIVATE_KEY,
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// console.log(serviceAccountAuth);
export const ReponseHandler = (status, message, data = null) => {
	return {
		status,
		message,
		data,
	};
};

export const Bufferize = () => {};

export const archiveIt = (html, data) => {
	const template = Handlebars.compile(html);
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
		const compiled_html = template(row);
		archive.append(compiled_html, { name: `${n}.html` });
		// archive.file(compiled_html, { name: `${n}.html` });
	});
	archive.directory("subdir/", "new-subdir");
	archive.directory("subdir/", false);

	archive.finalize();
	return archive;
};

// sheet extractor
export const extractSheet = async (sheet_id) => {
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

export const CaptureHTML = async (html, sheet_id) => {
	// get template sheet url from post request
	// const data = extractSheet(sheet_id)
	console.log(html, sheet_id);
	// get data from sheet template

	// get html from post request
	// let base64 = Buffer.from(html)

	// const captured = await captureWebsite.file(html, "sample.png");
	// return captured;
};
