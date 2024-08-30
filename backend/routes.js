import { Router } from "express";
import { TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet } from "./controllers/index.js";
import { Generator } from "./controllers/Generate.js";
import { TemplateGetOne, TemplatePreview, TemplateScreenshot } from "./controllers/Template.js";

const router = Router();
// router.get("/download/:id", DownloadFile);
// working routes

router.post("/template/register", TemplateAdd);
router.post("/generate", Generator);
router.get("/extract-sheet", ExtractSheet);
router.get("/templates", TemplteGetAll);
router.get("/template/:id", TemplateGetOne);
router.get("/template/:id/preview", TemplatePreview); // use fetched data instead
router.get("/template/:id/screenshot", TemplateScreenshot);
router.delete("/template/:id/delete", TemplateDelete);

const Routes = router;
export default Routes;
