import { api_key } from "../config.js";

export const APIKeyMiddleware = (req, res, next) => {
    const headers = req.headers;
    const key = headers["x-api-key"];
    if (!key) return res.status(403).send("Oops! You probably in a wrong spot. :)");
    if (key !== api_key) return res.status(403).send("Oops! You probably in a wrong spot. :)");

    next();
};
