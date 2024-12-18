import { GoogleGenerativeAI } from "@google/generative-ai";
import { ai_key, ai_model } from "../config.js";

export const ChatController = async (req, res) => {
    const history = res.locals.history;
    const text = res.locals.text;

    const genAI = new GoogleGenerativeAI(ai_key);
    const model = genAI.getGenerativeModel({ model: ai_model });

    const chat = model.startChat({
        history: [...history],
        systemInstruction: {
            parts: {
                text: `Make a response in a way the client will end up buying our main product Pineapple juice. We are PiñaFiesta, 
                we are selling tropical fruit juice, but our flagship is Pineapple Juice, It's prices range is around 90 to 140 PHP depending on its size.
                We are located at IT Park Cebu City`,
            },
        },
    });
    const result = await chat.sendMessage(text);

    req.session.history = [...history, { role: "model", parts: [{ text: result.response.text() }] }];

    // const result = await model.generateContent(prompt);
    // const result = await model.generateContent(prompt);

    res.status(200).json({ message: "okay", result: result });
};
