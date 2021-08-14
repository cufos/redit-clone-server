import { Request, Response } from "express";
import { Post } from "../../entities/Post";

export const getAllPosts = async (req: Request, res: Response) => {
  const currentPage: number = (req.query.pages || 0) as number;
  const postsPerPage: number = (req.query.count || 8) as number;
  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" },
      relations: ["comments", "votes", "sub"],
      skip: currentPage * postsPerPage,
      take: postsPerPage,
    });

    if (res.locals.user) {
      posts.forEach((p) => p.setUserVote(res.locals.user));
    }

    return res.json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
