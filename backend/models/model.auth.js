import { Users } from "../Schema/index.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { responsder } from "../Utils/util.js";

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

    console.log(data);

    return {
        name: data.name,
        username: data.username,
        email: data.email,
        role: data.role,
        secret: data.secret,
    };
};

export const Register = async (cred) => {
    const { name, username, email, password, role } = cred;

    const buffer = await crypto.randomBytes(16);
    const user_secret = await buffer.toString("base64");
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

export const RegisterRefreshToken = async (user, client_ip, token) => {
    RemoveToken(token, user, client_ip);

    try {
        await Users.updateOne({ $or: [{ email: user }, { username: user }] });
    } catch (err) {
        // log error in text document
        console.log(err);
    }
};

/**
 *
 * @param {string} token
 * @param {string} user
 * @param {string | null} client_ip
 */
export const RemoveToken = async (token, user, client_ip = null) => {
    const filter = { $or: [{ email: user }, { username: user }] };

    const refresh_tokens = await Users.findOne(filter, "refreshTokens");

    if (refresh_tokens) {
        const filtered_refresh_tokens = refresh_tokens.filter((item) => {
            if (!client_ip) return item !== token;

            const user_ip = jwt.decode(item, { json: true })?.client_ip;
            if (user_ip !== client_ip) return item;
        });

        try {
            await Users.updateOne(filter, {
                refreshTokens: filtered_refresh_tokens,
            });
        } catch (err) {
            // log error in text document
            console.log(err);
        }
    }
};
