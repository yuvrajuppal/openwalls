import { Router } from "express";
import { getAll, getallcategories, randomwallpapers, getseachresut, getById } from "../controller/wallpapers.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/categories", getallcategories);
router.get("/random", randomwallpapers);
router.get("/search", getseachresut);
router.get("/:id", getById);

export default router;
