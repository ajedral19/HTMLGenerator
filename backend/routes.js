import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet } from "./controllers/index.js";
import { CountSheets, TemplateGenerate, TemplateGetOne, TemplateGetPreview, TemplateGetScreenshot } from "./controllers/Template.js";
import { aiTest } from "./ai_test.js";
import { get_s3_objects, handle_s3_v2 } from "./controllers/S3Controller.js";
import { BucketGetSignedConnection, GetResources } from "./controllers/Bucket.js";
import { LoginController, LogoutController, RegisterController, ResetPaswordController } from "./controllers/AuthController.js";
import { RandomSheet } from "./models/model.spreadsheet.js";
import multer from "multer";
import { AuthMiddleware, ResetPasswordMiddleware } from "./middlewares/index.js";

const upload = multer();
const auth_router = Router();
const template_router = Router();
const s3Router = Router();

// test route
template_router.get("/test", AuthMiddleware, (req, res, next) => {
    const rt = res.locals.RefreshToken;
    const at = res.locals.AccessToken;
    res.status(200).cookie("Refresh-Token", rt, { httpOnly: true, sameSite: "strict" }).header({ "Access-Token": at }).send("all good now");
});

// working routes
// Auths
auth_router.post("/login", LoginController);
auth_router.delete("/logout", LogoutController);
auth_router.post("/register", RegisterController);
auth_router.put("/reset-password", ResetPasswordMiddleware, ResetPaswordController);
// Template Getter
template_router.get("/templates", TemplteGetAll);
template_router.get("/template/:template_id", TemplateGetOne);
template_router.get("/template/:id/preview", TemplateGetPreview);
template_router.get("/template/:template_id/screenshot", TemplateGetScreenshot);
template_router.get("/template/:template_id/generate", TemplateGenerate);
// Template Setters
template_router.post("/template/add", upload.single("template"), TemplateAdd);
template_router.delete("/template/", TemplateDelete);
template_router.delete("/template/:template_id", TemplateDelete);
// Spreadsheet Getters
template_router.get("/data/extract", ExtractSheet);
template_router.get("/data/sheet-count", CountSheets);
// extract unstructured documents
template_router.get("/random-sheets", RandomSheet);
// Google Gemini
template_router.get("/ai-test", aiTest);
// S# Bucket
s3Router.get("/get-secure-url", handle_s3_v2);
s3Router.get("/get-contents", get_s3_objects);
s3Router.get("/request", BucketGetSignedConnection);
s3Router.get("/resources", GetResources);

const AuthRoutes = auth_router;
const TemplateRoutes = template_router;
const S3Routes = s3Router;
export { AuthRoutes, TemplateRoutes, S3Routes };
