import jwt from "jsonwebtoken";
// secret must come from datebase(user's data)
// whenever the refresh token expires, the secret updates
import { secret } from "../config.js";

const verify = (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
        if (err) return false;
        return true;
    });
};

export const AuthMiddleware = (req, res, next) => {
    const cookie = req.cookies;
    const headers = req.headers;
    // res.headers.id
    // res.headers.user
    // res.headers.role

    let access_token = headers["authorization"].split(" ")[1];
    let refres_token = cookie["Refresh-Token"];

    if (!refres_token || !access_token) {
        // require sign in
        return res.status(403).send("forbidden");
    }

    if (!verify(refres_token)) {
        // require sign in
        return res.status(403).send("forbidden");
    }

    if (!verify(access_token)) res.locals.AccessToken = jwt.sign({ text: "hello" }, secret, { expiresIn: "1m" });
    else res.locals.AccessToken = access_token;

    res.locals.RefreshToken = refres_token;
    res.locals.payload = jwt.decode(refres_token, { json: true });
    next();
};
