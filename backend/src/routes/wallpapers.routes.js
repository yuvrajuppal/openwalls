import { Router } from "express";
import { getAll, getallcategories, randomwallpapers } from "../controller/wallpapers.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/categories", getallcategories);
router.get("/random", randomwallpapers);

export default router;
