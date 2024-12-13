import jwt from "jsonwebtoken";
import { Login, Register, Logout } from "../models/model.auth.js";
import { handleTokens, responsder } from "../Utils/util.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const LoginController = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(406).json(responsder(false, { error: "Field/s must not be empty" }));

    // execute model
    const user_data = await Login({ user, password });

    if (!user_data) return res.status(401).json(responsder(false, { error: "Invalid credential." }));

    // create access and refresh token
    const { username, name, role, secret } = user_data;
    const payload = { name, user, role };
    const tokens = await handleTokens(secret, payload, req);

    if (!tokens.ok) return res.status(500).json(responsder(false, { ...tokens.data, message: "Failed to issue a token" }));

    const headers = {
        User: username,
        "Access-Role": role,
        "Access-Token": tokens.data.accessToken,
    };

    res.status(202)
        .cookie("Refresh-Token", tokens.data.refreshToken, { httpOnly: true, sameSite: "strict" })
        .header(headers)
        .json(responsder(true, { name, role }));
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const LogoutController = async (req, res) => {
    const token = res.locals.RefreshToken;
    const client_ip = req.socket.remoteAddress;
    const { user } = req.headers;
    // delete refresh token in document
    Logout(user, client_ip, token);
    res.status(200).send("logged out");
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const RegisterController = async (req, res) => {
    // secret
    // refreshTokens
    // role
    const { name, email, username, password, repassword } = req.body;
    if (!name || !email || !username || !password || !repassword) return res.status(400).json(responsder(false, { error: "Field/s must not be empty" }));
    if (password !== repassword) return res.status(400).json(responsder(false, { error: "Password didn't matched" }));
    const client_ip = req.socket.remoteAddress;
    const data = { name, email, username, password };

    const new_user = await Register(data);
    if (!new_user.ok) return res.status(406).json(responsder(false, { error: `[${new_user.data?.field.toUpperCase()}] already exists.` }));

    console.log(new_user.data.secret);

    const payload = { test: "" };
    const access_token = jwt.sign(payload, new_user.data.secret, { algorithm: "HS256", expiresIn: "1h" });

    const headers = {
        User: new_user.data.user,
        "Access-Role": new_user.data.role,
        "Access-Token": access_token,
    };
    res.status(201)
        .header(headers)
        .json(responsder(true, { message: `New user named ${new_user.data.name} role default to USER.`, user: new_user.data.user }));
};

export const ForgotPaswordController = async (req, res) => {
    res.status(200).send("logged in");
};

export const ResetPaswordController = async (req, res) => {
    res.status(200).send("logged in");
};
