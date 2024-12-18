import { Users } from "../Schema/index.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { responsder } from "../Utils/util.js";
import { expires } from "../config.js";

/**
 *
 * @param {*} cred
 * @returns
 */
export const Login = async (cred) => {
    const { user, password } = cred;

    const data = await Users.findOne(
        {
            $or: [{ username: user }, { email: user }],
        },
        "name username password role secret refreshToken"
    );

    if (!data) return null;
    if (!(await bcryptjs.compare(password, data.password))) return null;

    return {
        name: data.name,
        username: data.username,
        email: data.email,
        role: data.role,
        secret: data.secret,
    };
};

export const Logout = async (user, client_ip, token) => {
    await Users.updateOne(
        {
            $or: [{ username: user }, { email: user }],
            $where: async () => {
                const client = await jwt.decode(token, { json: true });
                console.log(client, "client");

                return client.ip !== client_ip;
            },
        },
        {
            refreshTokens: [],
        }
    );
};

/**
 *
 * @param {{
 *  name: string,
 *  username: string,
 *  email: string,
 *  password: string,
 *  role?: string
 * }} cred
 * @returns
 */
export const Register = async (cred) => {
    const { name, username, email, password, role } = cred;

    const buffer = crypto.randomBytes(16);
    const user_secret = buffer.toString("base64");
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const payload = {
        name,
        username,
        email,
        password: hash,
        secret: user_secret,
        role: "USER",
    };

    try {
        const new_user = await Users.create(payload);
        return responsder(true, {
            name: new_user.name,
            user: new_user.username,
            role: new_user.role,
            secret: new_user.secret,
        });
    } catch (error) {
        const { errmsg, keyPattern } = error.errorResponse;
        return responsder(false, { error: errmsg, field: Object.keys(keyPattern)[0] });
    }
};

export const RequestPaswwortUpdate = async (user) => {
    // send a token to email
}

export const ResetPassword = async (cred) => {
    await Users.updateOne({ $or: [{ username: "" }, { email: "" }] }, { password: "" });
};

export const CreateRefreshToken = async (payload, user, secret, security) => {
    const { client_ip = null, user_agent = null } = security;
    const { rt } = expires;

    // client's IP is missing
    if (!client_ip) return responsder(false, { error: "Invalid request" });

    const tokens = await RemoveToken(user, client_ip);

    if (tokens) if (!tokens.ok) return responsder(false, { ...tokens.data });

    const fresh_token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: rt });
    try {
        await Users.updateOne(
            { $or: [{ email: user }, { username: user }] },
            {
                refreshTokens: [...tokens.data.refreshTokens, fresh_token],
            }
        );

        return responsder(true, { refreshToken: fresh_token });
    } catch (err) {
        // log error in text document
        return responsder(false, { error: err.message });
    }
};

/**
 *
 * @param {string} token
 * @param {string} user
 * @param {string | null} client_ip
 */
export const RemoveToken = async (user, client_ip = null) => {
    const filter = { $or: [{ email: user }, { username: user }] };

    const data = await Users.findOne(filter, "refreshTokens");
    if (!data) return responsder(false, { error: "Unauthorized access." });
    const { refreshTokens } = data;
    const tokens = refreshTokens;

    const filtered = tokens.filter((item) => {
        const payload = jwt.decode(item, { json: true });

        if (client_ip !== payload.client_ip) return item;
    });

    try {
        await Users.updateOne(filter, {
            refreshTokens: filtered,
        });

        return responsder(true, { refreshTokens: filtered });
    } catch (err) {
        // log error in text document
        return responsder(false, { error: err.message });
    }
};
