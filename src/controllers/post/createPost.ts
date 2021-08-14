import { Request, Response } from "express";
import { Post } from "../../entities/Post";
import { Sub } from "../../entities/Sub";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === "") {
    return res.status(400).json({ title: "title must not be empty" });
  }

  try {
    const subRecord = await Sub.findOneOrFail({ name: sub });

    const post = new Post({ title, body, user, sub: subRecord });

    await post.save();

    return res.json(post);
  } catch (err) {
    console.log(err);
  }
};
