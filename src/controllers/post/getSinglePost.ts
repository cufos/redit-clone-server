import { Request, Response } from "express";
import { Post } from "../../entities/Post";

export const getSinglePost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const post = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ["sub", "votes", "comments"] }
    );

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    return res.json({ post });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "Post not found" });
  }
};
