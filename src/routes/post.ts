import { Router } from "express";

// middlewares
import auth from "../middlewares/auth";
import user from "../middlewares/user";

// controllers
import { createPost } from "../controllers/post/createPost";
import { commentOnPost } from "../controllers/post/commentOnPost";
import { getAllPosts } from "../controllers/post/getAllposts";
import { getSinglePost } from "../controllers/post/getSinglePost";
import { getPostComments } from "../controllers/post/getPostComments";

const router = Router();

router.post("/", user, auth, createPost);
router.get("/", user, getAllPosts);
router.get("/:identifier/:slug", user, getSinglePost);
router.post("/:identifier/:slug/comments", user, auth, commentOnPost);
router.get("/:identifier/:slug/comments", user, getPostComments);

export default router;
