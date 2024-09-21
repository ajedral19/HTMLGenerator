import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet } from "./controllers/index.js";
import { Generator } from "./controllers/Generate.js";
import {
	CountSheets,
	RandomSheet,
	TemplateCount,
	TemplateGetOne,
	TemplateGetPreview,
	TemplateGetScreenshot,
} from "./controllers/Template.js";
import { aiTest } from "./ai_test.js";
import multer from "multer";
import { HandlePreview } from "./controllers/Preview.js";
import { handle_s3, handle_s3_get } from "./controllers/S3Controller.js";

const upload = multer();

const template_router = Router();
const html_router = Router();
const s3Router = Router();
// router.get("/download/:id", DownloadFile);
// working routes

template_router.get("/templates", TemplteGetAll); //okay - 1
template_router.get("/template/:id/preview", TemplateGetPreview); // okay - 1
template_router.get("/template/:template_id/screenshot", TemplateGetScreenshot); // okay - 1
template_router.get("/template/:template_id", TemplateGetOne); //okay - 1
template_router.post("/template/add", upload.single("template"), TemplateAdd); //okay - 1
template_router.delete("/template/:template_id", TemplateDelete); // okay - 1

template_router.get("/template/:template_id/generate", Generator);
template_router.get("/templates/count", TemplateCount);

template_router.get("/data/extract", ExtractSheet); //okay - 1
template_router.get("/data/sheet-count", CountSheets); // okay - 1

// dummy route
template_router.get("/random-sheets", RandomSheet);

template_router.get("/ai-test", aiTest);

s3Router.get("/", handle_s3);
s3Router.get("/get", handle_s3_get);

// html routes
html_router.get("/:id/preview", HandlePreview);

const TemplateRoutes = template_router;
const HTMLRoutes = html_router;
const S3Routes = s3Router;
export { TemplateRoutes, HTMLRoutes, S3Routes };
