export const SessionMiddleware = async (req, res, next) => {
    const text = req.body.text;

    if (!text) return res.status(203);

    const prompt = {
        role: "user",
        parts: [{ text }],
    };
    req.session.history = req.session.history ? [...req.session.history, prompt] : [prompt];
    res.locals.history = req.session.history;
    res.locals.text = text;
    
    next();
};
