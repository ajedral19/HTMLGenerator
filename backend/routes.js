import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet } from "./controllers/index.js";

import { CountSheets, TemplateGenerate, TemplateGetOne, TemplateGetPreview, TemplateGetScreenshot } from "./controllers/Template.js";
import { aiTest } from "./ai_test.js";
import multer from "multer";
import { get_s3_objects, handle_s3_v2 } from "./controllers/S3Controller.js";
import { BucketGetSignedConnection, GetResources } from "./controllers/Bucket.js";
import { AuthMiddleware } from "./middlewares/authMidleware.js";
import { ForgotPaswordController, LoginController, LogoutController, RegisterController, ResetPaswordController } from "./controllers/AuthController.js";
import { APIKeyMiddleware } from "./middlewares/apiKeyMiddleware.js";

const upload = multer();

const auth_router = Router();
const template_router = Router();
const s3Router = Router();
// router.get("/download/:id", DownloadFile);
// working routes

// Auths
auth_router.post("/login", APIKeyMiddleware, LoginController);
auth_router.delete("/logout", APIKeyMiddleware, LogoutController);
auth_router.post("/register", RegisterController);
auth_router.get("/forgot-password", ForgotPaswordController);
auth_router.put("/reset-password", ResetPaswordController);

template_router.get("/test", APIKeyMiddleware, AuthMiddleware, (req, res, next) => {
    const rt = res.locals.RefreshToken;
    const at = res.locals.AccessToken;
    console.log(res.locals.payload);

    res.status(200).cookie("Refresh-Token", rt, { httpOnly: true, sameSite: "strict" }).header({ "Access-Token": at }).send("all good now");
});
template_router.get("/templates", TemplteGetAll); //okay - 1
template_router.get("/template/:id/preview", TemplateGetPreview); // okay - 1
template_router.get("/template/:template_id/screenshot", TemplateGetScreenshot); // okay - 1
template_router.get("/template/:template_id", TemplateGetOne); //okay - 1
template_router.post("/template/add", upload.single("template"), TemplateAdd); //okay - 1
template_router.delete("/template/", TemplateDelete); // okay - 1
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

const AuthRoutes = auth_router;
const TemplateRoutes = template_router;
const S3Routes = s3Router;
export { AuthRoutes, TemplateRoutes, S3Routes };
