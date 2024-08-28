import { Router } from "express";
import { DownloadFile, TemplateAdd, TemplateDelete, TemplteGetAll, ExtractSheet } from "./controllers/index.js";
import { Generator, ScreenCapture } from "./controllers/Generate.js";
import { TemplateGetOne, TemplatePreview, } from "./controllers/Template.js";

const router = Router();

router.get("/extract-sheet", ExtractSheet)

router.post("/generate", Generator);
router.get("/download/:id", DownloadFile);
router.post("/capture", ScreenCapture);

// register template
router.get("/templates", TemplteGetAll);
router.get("/template/:id", (req, res) => TemplateGetOne(req, res));
router.get("/template/:id/preview", (req, res) => TemplatePreview(req, res));
router.get("/template/:id/download", (req, res) => {});
router.get("/template/:id/update", (req, res) => {});
router.delete("/template/:id/delete", TemplateDelete);
router.post("/template/register", TemplateAdd);
const Routes = router;
export default Routes;
