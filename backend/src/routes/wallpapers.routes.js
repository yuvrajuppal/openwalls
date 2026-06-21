import { Router } from "express";
import { getAll, getallcategories, randomwallpapers, getseachresut, getById } from "../controller/wallpapers.controller.js";
import { wallpaperlike, wallpaperunlike, checkuserlikedthewallpaperid, getmyalllikedwallpapers } from "../controller/wallpaperLikes.controller.js";
import { authenticate } from "../middleware/user.middleware.js";

const router = Router();

router.get("/", getAll);
router.get("/categories", getallcategories);
router.get("/random", randomwallpapers);
router.get("/search", getseachresut);
router.post("/:id/like", authenticate, wallpaperlike);
router.post("/:id/unlike", authenticate, wallpaperunlike);
router.get("/my-likes", authenticate, getmyalllikedwallpapers);
router.get("/:id/checklike", authenticate, checkuserlikedthewallpaperid);
router.get("/:id", getById);

export default router;
