import http from "http";
import https from "https";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import Store from "connect-mongo";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { TemplateRoutes, S3Routes, AuthRoutes, GeminiRoutes } from "./routes.js";
import { APIKeyMiddleware, AuthMiddleware } from "./middlewares/index.js";
import { socket_get_all_templates } from "./SocketControls.js";
import { Server } from "socket.io";
import { SessionMiddleware } from "./middlewares/sessionMiddleware.js";

const app = express();
const cert = readFileSync("ssl/CA_certificate.arm", "utf-8");
const key = readFileSync("ssl/CA_private_key.key", "utf-8");

const credentials = { key: key, cert: cert };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.disable("x-powered-by");
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "1kb" }));
app.use(APIKeyMiddleware);
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        name: "Chat",
        genid: () => "generate random id or leave this property undefiend",
        cookie: { domain: "host.generator.com", maxAge: 10 * 60000, secure: true, path: "/helper", httpOnly: true },
        store: Store.create({
            client: mongoose.connection.getClient(),
            autoRemove: "interval",
            autoRemoveInterval: 1, // 1 minute
        }),
    })
);
app.use("/auth/", AuthRoutes);
app.use("/api/", AuthMiddleware, TemplateRoutes);
app.use("/bucket/api/", AuthMiddleware, S3Routes);
app.use("/helper/", AuthMiddleware, SessionMiddleware, GeminiRoutes);
// create pug ui for 404 response
app.use("/*", (req, res) => res.status(404).json({ message: "Oops! Page not found" }));

const io = new Server(httpServer, {
    cors: {
        origin: "*", // client
        methods: ["POST", "GET", "DELETE", "UPDATE", "PUT", "PATCH"],
        // credentials: true
    },
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("test", (prop) => console.log("ahh okay " + prop.text));

    socket.on("templates", async () => {
        const { rows, rowCount } = await socket_get_all_templates();
        console.log("fetching");

        io.emit("get_templates", { rows, rowCount });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const port = process.env.PORT || 9100;
const host = "host.generator.com";

// app.listen(port, () => console.log("server runs at port " + port));
httpServer.listen(port, host, () => console.log("server runs at port " + port));
httpsServer.listen(9200, host, () => console.log("server runs at port " + 9200));

// https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// https://stackoverflow.com/questions/43244033/programmatically-create-certificate-and-certificate-key-in-node
