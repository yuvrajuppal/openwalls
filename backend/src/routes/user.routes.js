import { Router } from "express";
import { signup, login, logout, checkislogin } from "../controller/user.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkislogin", checkislogin);

export default router;
