import { GoogleSpreadsheet } from "google-spreadsheet";
import { serviceAccountAuth } from "../config.js";
import { get_sheet_id, response_handler } from "../utils.js";

export const SheetGetCount = async (req, res) => {
    const { spreadsheet = null } = req.query;
    let count = 0;
    const id = get_sheet_id(spreadsheet);

    if (id) {
        const doc = new GoogleSpreadsheet(id, serviceAccountAuth);
        await doc.loadInfo();
        doc.sheetsApi();
        count = doc.sheetCount;
    }

    return response_handler(200, "", { rowCount: count })(res);
};
