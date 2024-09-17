import express from "express";
import cors from "cors";
import {TemplateRoutes, HTMLRoutes, S3Routes} from "./routes.js";

import { Server } from "socket.io";
import http from "http";
import { socket_get_all_templates } from "./SocketControls.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*", // client
		methods: ["POST", "GET", "DELETE", "UPDATE", "PUT", "PATCH"],
		// credentials: true
	},
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/", TemplateRoutes);
app.use("/html/", HTMLRoutes);
app.use("/s3/", S3Routes);

app.use("/*", (req, res) => res.status(404).json({ message: "Oops! Page not found" }));

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

// app.listen(port, () => console.log("server runs at port " + port));
server.listen(port, () => console.log("server runs at port " + port));
