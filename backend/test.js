import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
// import { readFileSync } from "fs";
import { config } from "dotenv";

const env = config();
const { CLIENT_EMAIL, PRIVATE_KEY } = env.parsed;

const sheet_id = "1-VH-PUDKBmF5R7j_BTrb32dMLXlZJqjNR6GjzK3a9qE";

const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function testFunc() {
    const doc = new GoogleSpreadsheet(sheet_id, serviceAccountAuth);
    await doc.loadInfo();

    let result = {};

    const sheet_count = doc.sheetCount;
    for (let n = 0; n < sheet_count; n++) {
        const sheet = doc.sheetsByIndex[n];

        const rows = await sheet.getRows();

        let content = {};
        rows.forEach((row) => {
            let values = row._rawData;
            let key = values.shift();
            content[key] = values;
        });

        result[`sheet_${n + 1}`] = content;
    }

    console.log(result);
}

testFunc();
