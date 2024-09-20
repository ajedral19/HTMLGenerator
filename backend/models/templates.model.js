import { HTMLGenerator } from "../Schema/index.js";
import { get_offset } from "../utils.js";
import { resolveObjectURL } from "node:buffer";

export const TemplatesAppend = () => {};

/**
 *
 * @param {number} page
 * @param {number} limit
 * @returns
 */
export const TemplatesFind = async (page = 1, limit = 10) => {
    const offset = get_offset(page, limit);

    try {
        const rows = await HTMLGenerator.find({}).skip(offset).limit(limit);

        const data = rows.map((row) => {
            const { id, template_name: name, template_data_url: sheet } = row;

            return {
                id,
                name,
                sheet,
            };
        });

        return {
            success: true,
            rows: [...data],
        };
    } catch (err) {
        let status_code = 400;
        switch (err.name) {
            case "MongoServerError":
                status_code = 500;
                break;
            default:
                break;
        }

        return {
            success: false,
            code: status_code,
            error: {
                type: err.name,
                message: err.message,
            },
        };
    }
};

export const TemplatesFindOne = () => {};

export const TemplatesDeleteOne = () => {};
