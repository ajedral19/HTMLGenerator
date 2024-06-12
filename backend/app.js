import express from "express";
import cors from "cors";
import Routes from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", Routes);

app.use("/*", (req, res) => res.status(404).json({ message: "Page not found" }));

const port = process.env.PORT || 9100;
app.listen(port, () => console.log("server runs at port " + port));
