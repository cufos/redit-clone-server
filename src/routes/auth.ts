import { Router } from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import me from "../controllers/auth/me";
import logout from "../controllers/auth/logout";
import auth from "../middlewares/auth";
import user from "../middlewares/user";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("me", user, auth, me);
router.get("logout", user, auth, logout);

export default router;
