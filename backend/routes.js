import { Router } from "express";
import { DownloadFile, Generate, SaveTemplate } from "./controllers/index.js";
import { DeleteTemplate, GetTemplates } from "./controllers/Template.js";
import { Generator } from "./controllers/Generate.js";

const router = Router();

router.post("/generate", Generator);
router.get("/download/:id", DownloadFile);

// register template
router.get("/templates", GetTemplates);
router.get("/template/:id", (req, res) => {
    res.send("template + id");
});
router.get("/template/:id/download", (req, res) => {});
router.get("/template/:id/update", (req, res) => {});
router.delete("/template/:id/delete", DeleteTemplate);
router.post("/template/register", SaveTemplate);
const Routes = router;
export default Routes;
