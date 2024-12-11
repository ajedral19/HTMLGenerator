import jwt from "jsonwebtoken";
import { Login, Register, RegisterRefreshToken } from "../models/model.auth.js";
import { responsder } from "../Utils/util.js";

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
    const { name, role, secret } = user_data;
    const client_ip = req.socket.remoteAddress;
    const payload = { client_ip, name, user, role };
    const access_token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "1h" });
    const refresh_token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "1w" });

    // update/register refresh_token to user_data's refresh_token
    await RegisterRefreshToken(user, client_ip, refresh_token);

    const headers = {
        User: user,
        "Access-Role": role,
        "Access-Token": access_token,
    };

    res.status(202).cookie("Refresh-Token", refresh_token, { httpOnly: true, sameSite: "strict" }).header(headers).send("logged in");
};

export const LogoutController = async (req, res) => {
    res.status(200).send("logged in");
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
    if (!new_user.ok) return res.status(406).json(responsder(false, { error: `{${new_user.data?.field.toUpperCase()}} already exists.` }));

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
