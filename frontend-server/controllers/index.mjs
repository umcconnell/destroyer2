import { Router } from "express";
import API from "#frontend-server/controllers/api/index";

let router = Router();
router.use("/api", API);

export default router;
