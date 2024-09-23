import { GoogleSpreadsheet } from "google-spreadsheet";
import { serviceAccountAuth } from "../config.js";
import { handle_error } from "../utils.js";

/**
 * @param {string} spreadsheet - Spreadsheet URL or ID
 * @param {number} offset - Defines what index (index count start at 1) loop would start. If empty or less than or equal to 0 the value defaults to 1
 * @param {number} limit - Defines the limit of iteration, the maximum iteration is 60. If empty or less than or equal to 0 the value defaults to 10
 * @returns Promise | null
 */
export const Extract = async (spreadsheet, offset = 1, limit = 10) => {
    if (isNaN(offset) || offset <= 0) offset = 1;
    if (isNaN(limit) || limit <= 0) limit = 10;

    let response = null;

    try {
        const doc = new GoogleSpreadsheet(spreadsheet, serviceAccountAuth);
        await doc.loadInfo();
        doc.sheetsApi();
        const sheet_count = doc.sheetCount;

        if (offset > sheet_count) offset = sheet_count;

        let result = [];
        let index = offset - 1;
        for (let m = 1; m <= limit; m++) {
            console.log("item number: ", m, "request index: ", index, "printing");

            const sheet = doc.sheetsByIndex[index];
            const rows = await sheet.getRows({ offset: 0 });
            let content = { index: index + 1 };
            let prev_key = "";
            rows.forEach((row, n, arr) => {
                let values = row._rawData;
                let key = values.shift();
                let eng, jp, props;
                prev_key = !key.includes("_jp") ? key : prev_key;

                if (key.includes("_jp")) {
                    let prev_values = arr[n - 1]._rawData;
                    if (values.length > 1 && prev_values.length > 1) {
                        props = [];
                        eng = prev_values;
                        jp = values;

                        eng.forEach((item, o) => {
                            props = [...props, { eng: item, jp: jp[o] }];
                        });
                    } else {
                        jp = values.toString();
                        eng = prev_values.toString();
                        props = { eng, jp };
                    }
                }
                content[prev_key] = props;
            });

            result = [...result, content];
            response = result;
            index += 1;
            if (index >= sheet_count) break;
        }
    } catch (err) {
        return handle_error(err);
    } finally {
        console.log("done executing");
        // exucute the request timer here
    }

    return { rows: response, rowCount: response.length };
};

export const SheetCount = async (spreadsheet) => {
    if (!spreadsheet && typeof spreadsheet !== "string") return null;

    try {
        const doc = new GoogleSpreadsheet(spreadsheet, serviceAccountAuth);
        await doc.loadInfo();
        doc.sheetsApi();
        const count = doc.sheetCount;

        return { count };
    } catch (err) {
        return handle_error(err);
    } finally {
        console.log("done executing");
    }
};

// extract unstructured documents
// export const RandomSheet = async (req, res) => {
//     const spreadsheet = "https://docs.google.com/spreadsheets/d/1CgbIAfjgW-P8Z6te2KKiIBuUftAuwdxk9RBydm3TZr0/edit?gid=1945486897#gid=1945486897";
//     const sheet_id = get_sheet_id(spreadsheet);

//     const sheet = await get_random_sheet(sheet_id);

//     return res.status(200).json(sheet);
// };
