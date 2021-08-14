import { Router } from "express";

// middlewares
import auth from "../middlewares/auth";
import user from "../middlewares/user";

// controller
import { createSubs } from "../controllers/sub/createSub";
import { getSub } from "../controllers/sub/getSub";
import { ownSub, upload, uploadImage } from "../controllers/sub/uploadImage";
import { searchSubs } from "../controllers/sub/searchSubs";

const router = Router();

router.post("/", user, auth, createSubs);
router.get("/:name", user, getSub);
router.get("/search/:name", searchSubs);
router.post(
  "/:name/image",
  user,
  auth,
  ownSub,
  upload.single("file"),
  uploadImage
);

export default router;
