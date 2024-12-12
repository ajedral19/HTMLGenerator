import jwt from "jsonwebtoken";
// secret must come from datebase(user's data)
// whenever the refresh token expires, the secret updates
import { secret } from "../config.js";
import { RemoveToken } from "../models/model.auth.js";
import { responsder } from "../Utils/util.js";

const verify = (token, client_ip, user) => {
    const payload_data = jwt.decode(token, { json: true });
    if (!payload_data.client_ip || !payload_data.user) return false;
    if (payload_data.client_ip !== client_ip || payload_data.user !== user) return false;

    return jwt.verify(token, secret, (err, decoded) => (err ? false : true));
};

export const AuthMiddleware = (req, res, next) => {
    const cookie = req.cookies;
    const headers = req.headers;
    const user = req.headers.user;
    const role = req.headers["access-role"];
    const client_ip = req.socket.remoteAddress;

    let access_token = headers["authorization"].split(" ")[1];
    let refresh_token = cookie["Refresh-Token"];
    console.log(access_token);
    console.log(refresh_token);

    if (!refresh_token || !access_token) {
        // scan thru user's refresh_tokens and remove any token that has the same client_ip in its payload
        // RemoveToken(refresh_token, user, client_ip)
        // require sign in
        return res.status(403).json(responsder(false, { error: "Unauthorized access. Register or Login to your account" }));
    }

    if (!verify(refresh_token, client_ip, user)) {
        // remove in document
        // RemoveToken(refresh_token, user)
        // require sign in
        return res.status(403).json(responsder(false, { error: "Session expired. Login again" }));
    }

    if (!verify(access_token, client_ip, user)) res.locals.AccessToken = jwt.sign({ text: "hello" }, secret, { expiresIn: "1m" });
    else res.locals.AccessToken = access_token;

    res.locals.RefreshToken = refresh_token;
    res.locals.payload = jwt.decode(refresh_token, { json: true });
    next();
};
