import { GoogleGenerativeAI } from "@google/generative-ai";
import { ai_key, ai_model } from "../config.js";

export const ChatController = async (req, res) => {
    const history = res.locals.history;
    const text = res.locals.text;

    const genAI = new GoogleGenerativeAI(ai_key);
    const model = genAI.getGenerativeModel({ model: ai_model });

    const chat = model.startChat({ history: [...history] });
    const result = await chat.sendMessage(text);

    req.session.history = [...history, { role: "model", parts: [{ text: result.response.text() }] }];

    // const result = await model.generateContent(prompt);
    // const result = await model.generateContent(prompt);

    res.status(200).json({ message: "okay", result: result });
};
