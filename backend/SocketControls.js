import { GetAllTemplates } from "./Model.js";

export const socket_get_all_templates = async () => {
    return { data: (await GetAllTemplates()) || [] };
};
