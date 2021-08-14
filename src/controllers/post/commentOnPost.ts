import { Request, Response } from "express";
import { Comment } from "../../entities/Comment";
import { Post } from "../../entities/Post";

export const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const { body } = req.body;

  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({
      body,
      user: res.locals.user,
      post,
    });

    await comment.save();

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Post not found" });
  }
};
