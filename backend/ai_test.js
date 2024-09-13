import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
const env = config();

const { GOOGLE_API_KEY } = env.parsed;

export const aiTest = async (req, res) => {
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        grab every visible japanese characters paragraphs or sentences
        on this page https://nativecamp.net/vi/campaign/half_price-callan
    `;

    const result = await model.generateContent(prompt);

    res.status(200).json({ message: "okay", result });
};
