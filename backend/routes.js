import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, TemplateArchive, ExtractSheet } from "./controllers/index.js";

import { CountSheets, TemplateGenerate, TemplateGetOne, TemplateGetPreview, TemplateGetScreenshot } from "./controllers/Template.js";
import { aiTest } from "./ai_test.js";
import multer from "multer";
import { get_s3_objects, handle_s3_v2 } from "./controllers/S3Controller.js";
import { BucketGetSignedConnection, GetResources } from "./controllers/Bucket.js";

const upload = multer();

const template_router = Router();
const s3Router = Router();
// router.get("/download/:id", DownloadFile);
// working routes

template_router.get("/templates", TemplteGetAll); //okay - 1
template_router.patch("/template/:id/archive", TemplateArchive); // okay
template_router.get("/template/:id/preview", TemplateGetPreview); // okay - 1
template_router.get("/template/:template_id/screenshot", TemplateGetScreenshot); // okay - 1
template_router.get("/template/:template_id", TemplateGetOne); //okay - 1
template_router.post("/template/add", upload.single("template"), TemplateAdd); //okay - 1
template_router.delete("/template/:template_id", TemplateDelete); // okay - 1
template_router.get("/template/:template_id/generate", TemplateGenerate); // okay - 1
template_router.get("/data/extract", ExtractSheet); //okay - 1
template_router.get("/data/sheet-count", CountSheets); // okay - 1

// extract unstructured documents
// template_router.get("/random-sheets", RandomSheet);

template_router.get("/ai-test", aiTest);
// s3Router.get("/", handle_s3);
s3Router.get("/get-secure-url", handle_s3_v2);
s3Router.get("/get-contents", get_s3_objects);
s3Router.get("/request", BucketGetSignedConnection);
s3Router.get("/resources", GetResources);

const TemplateRoutes = template_router;
const S3Routes = s3Router;
export { TemplateRoutes, S3Routes };
