import { GoogleSpreadsheet } from "google-spreadsheet";
import { serviceAccountAuth } from "../config.js";
import { response_handler } from "../utils.js";

export const SheetGetCount = async (req, res) => {
    const { id = null } = req.query;
    let count = 0;

    if (id) {
        const doc = new GoogleSpreadsheet(id, serviceAccountAuth);
        await doc.loadInfo();
        doc.sheetsApi();
        count = doc.sheetCount;
    }

    return response_handler(200, "", { rowCount: count })(res);
};
