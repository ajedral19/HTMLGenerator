import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet, SheetGetCount } from "./controllers/index.js";
import { Generator } from "./controllers/Generate.js";
import { TemplateCount, TemplateGetOne, TemplatePreview, TemplateScreenshot } from "./controllers/Template.js";
import { aiTest } from "./ai_test.js";
import multer from "multer";
import { HandlePreview } from "./controllers/Preview.js";

const upload = multer();

const template_router = Router();
const html_router = Router();
// router.get("/download/:id", DownloadFile);
// working routes

template_router.get("/templates", TemplteGetAll);
template_router.get("/templates/count", TemplateCount);
template_router.post("/template/add", upload.single("template"), TemplateAdd);
template_router.get("/template/:template_id", TemplateGetOne);
template_router.get("/template/:template_id/screenshot", TemplateScreenshot);
template_router.get("/template/:template_id/generate", Generator);
template_router.delete("/template/:template_id", TemplateDelete);
template_router.get("/extract", ExtractSheet);

template_router.get("/template/sheet-count", SheetGetCount);
template_router.get("/template/:id/preview", TemplatePreview); // use fetched data instead

template_router.get("/ai-test", aiTest);

// html routes
html_router.get("/:id/preview", HandlePreview);

const TemplateRoutes = template_router;
const HTMLRoutes = html_router;
export { TemplateRoutes, HTMLRoutes };
