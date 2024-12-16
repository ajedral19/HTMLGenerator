import jwt from "jsonwebtoken";
// secret must come from datebase(user's data)
// whenever the refresh token expires, the secret updates
import { RemoveToken } from "../models/model.auth.js";
import { responsder } from "../Utils/util.js";
import { Users } from "../Schema/index.js";
import { expires } from "../config.js";

const verify = async (token, client_ip, user) => {
    const payload_data = jwt.decode(token, { json: true });
    if (!payload_data?.client_ip || !payload_data.user) return false;
    if (payload_data.client_ip !== client_ip || payload_data.user !== user) return false;

    // return jwt.verify(token, secret, (err, decoded) => (err ? false : true));
    const data = await Users.findOne({ $or: [{ username: user }, { email: user }] }, "secret");
    
    if (!data) return false;

    return jwt.verify(token, data.secret, (err, decode) => (err?.message ? false : { ...decode, secret: data.secret }));
};

export const AuthMiddleware = async (req, res, next) => {
    const cookie = req.cookies;
    const headers = req.headers;
    const user = req.headers.user;
    // const role = req.headers["access-role"];
    const client_ip = req.socket.remoteAddress;

    let access_token = headers["authorization"] ? headers["authorization"].split(" ")[1] : null;
    let refresh_token = cookie["Refresh-Token"] || null;

    if (!refresh_token || !access_token) {
        // include user-agent
        await RemoveToken(user, client_ip);
        // require sign in
        return res.status(403).json(responsder(false, { error: "Unauthorized access. Register or Login to your account" }));
    }

    const verified_token = await verify(refresh_token, client_ip, user);

    if (!verified_token) {
        // remove in document
        await RemoveToken(user, client_ip);
        // require sign in
        return res.status(403).json(responsder(false, { error: "Session expired. Login again" }));
    }

    const { name, user: user_login, role: user_role, secret, user_ip } = verified_token;

    const payload = {
        name,
        user: user_login,
        role: user_role,
        client_ip: user_ip,
    };
    if (!(await verify(access_token, client_ip, user))) res.locals.AccessToken = jwt.sign(payload, secret, { expiresIn: expires.at });
    // if (!(await verify(access_token, client_ip, user))) res.locals.AccessToken = jwt.sign(payload, secret, { expiresIn: expires.at });
    else res.locals.AccessToken = access_token;

    res.locals.RefreshToken = refresh_token;
    res.locals.payload = jwt.decode(refresh_token, { json: true });
    next();
};
