import { GetAllTemplates } from "./Model.js";
import { template_uri } from "./utils.js";

export const socket_get_all_templates = async () => {
    const rows = await GetAllTemplates()(template_uri());
    return { rows, rowCount: rows.length };
};
