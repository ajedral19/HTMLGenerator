import { Users } from "../Schema/index.js";
import bcryptjs from "bcryptjs";

export const Login = async (cred) => {
    const { user, password } = cred;

    const data = await Users.findOne(
        {
            $or: [{ username: user }, { email: user }],
        },
        "name username password role, refreshToken"
    );

    const is_matched = await bcryptjs.compare(password, hash);
    console.log("Password is matched: ", is_matched);

    if (!data) return null;

    return {
        name: data.name,
        username: data.username,
        email: data.email,
        role: data.role,
        refresh_token: data.refreshToken,
    };
};

export const Register = async (cred) => {
    const { name, username, email, password, role } = cred;

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    try {
        await Users.create({});
    } catch (error) {
        console.log(error);
    }

    return {};
};
