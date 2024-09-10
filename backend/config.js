import { config } from "dotenv";
import { JWT } from "google-auth-library";
const env = config();

const { CLIENT_EMAIL, PRIVATE_KEY } = env.parsed;

export const serviceAccountAuth = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
