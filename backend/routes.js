import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet, SheetGetCount } from "./controllers/index.js";
import { Generator } from "./controllers/Generate.js";
import { RandomSheet, TemplateCount, TemplateGetOne, TemplatePreview, TemplateScreenshot } from "./controllers/Template.js";
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

template_router.get("/templates", TemplteGetAll); //okay
template_router.get("/templates/count", TemplateCount);
template_router.post("/template/add", upload.single("template"), TemplateAdd); //okay
template_router.get("/template/:template_id", TemplateGetOne); //okay
template_router.get("/template/:template_id/screenshot", TemplateScreenshot);
template_router.get("/template/:template_id/generate", Generator);
template_router.delete("/template/:template_id", TemplateDelete); // okay

template_router.get("/data/extract", ExtractSheet); //okay
template_router.get("/data/sheet-count", SheetGetCount); // okay
// dummy route
template_router.get("/random-sheets", RandomSheet);

template_router.get("/template/:id/preview", TemplatePreview); // oka

template_router.get("/ai-test", aiTest);

s3Router.get("/", handle_s3);
s3Router.get("/get", handle_s3_get);

// html routes
html_router.get("/:id/preview", HandlePreview);

const TemplateRoutes = template_router;
const HTMLRoutes = html_router;
const S3Routes = s3Router;
export { TemplateRoutes, HTMLRoutes, S3Routes };
