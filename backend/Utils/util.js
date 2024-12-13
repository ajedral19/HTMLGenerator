import jwt from "jsonwebtoken";
import { CreateRefreshToken } from "../models/model.auth.js";
import { expires } from "../config.js";

export const responsder = (ok, payload) => {
    return {
        ok,
        data: {
            ...payload,
        },
    };
};

export const handleTokens = async (secret, payload_init, req = null) => {
    const client_ip = req?.socket.remoteAddress;
    const user_agent = req?.headers["user-agent"];
    const {at} = expires
    console.log(client_ip);
    console.log(user_agent);

    let payload = { ...payload_init };
    if (client_ip && user_agent) payload = { ...payload_init, client_ip };
    const access_token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: at });
    const refresh_token = await CreateRefreshToken(payload, payload.user, secret, { client_ip, user_agent });

    if (!refresh_token.ok) return responsder(false, { ...refresh_token.data });

    return responsder(true, {
        accessToken: access_token,
        refreshToken: refresh_token.data.refreshToken,
    });
};
