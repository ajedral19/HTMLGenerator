import { Login } from "../models/model.auth.js";

export const LoginController = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(406).json("cannot accept empty field");

    // execute model
    await Login({ user, password });

    res.status(200).send("logged in");
};

export const LogoutController = async (req, res) => {
    res.status(200).send("logged in");
};

export const RegisterController = async (req, res) => {
    res.status(200).send("logged in");
};

export const ForgotPaswordController = async (req, res) => {
    res.status(200).send("logged in");
};

export const ResetPaswordController = async (req, res) => {
    res.status(200).send("logged in");
};
