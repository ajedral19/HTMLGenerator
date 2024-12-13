import jwt from "jsonwebtoken";
// secret must come from datebase(user's data)
// whenever the refresh token expires, the secret updates
import { RemoveToken } from "../models/model.auth.js";
import { responsder } from "../Utils/util.js";
import { Users } from "../Schema/index.js";

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
    const role = req.headers["access-role"];
    const client_ip = req.socket.remoteAddress;

    let access_token = headers["authorization"].split(" ")[1];
    let refresh_token = cookie["Refresh-Token"];

    if (!refresh_token || !access_token) {
        // scan thru user's refresh_tokens and remove any token that has the same client_ip in its payload
        // include user-agent
        RemoveToken(user, client_ip);
        // require sign in
        return res.status(403).json(responsder(false, { error: "Unauthorized access. Register or Login to your account" }));
    }

    const verified_token = await verify(refresh_token, client_ip, user);
    console.log(verified_token, "test");

    if (!verified_token) {
        // remove in document
        RemoveToken(user, client_ip);
        // require sign in
        return res.status(403).json(responsder(false, { error: "Session expired. Login again" }));
    }

    const payload = {
        name: verified_token.name,
        user: verified_token.user,
        role: verified_token.role,
        client_ip: verified_token.client_ip,
    };
    if (!(await verify(access_token, client_ip, user))) res.locals.AccessToken = jwt.sign(payload, verified_token.secret, { expiresIn: "1m" });
    else res.locals.AccessToken = access_token;

    res.locals.RefreshToken = refresh_token;
    res.locals.payload = jwt.decode(refresh_token, { json: true });
    next();
};
