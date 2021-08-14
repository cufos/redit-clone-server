import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const secret = process.env.SECRET;

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) return next();

    const { username }: any = jwt.verify(token, secret);

    const user = await User.findOne({ username });

    res.locals.user = user;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: "Unauthenticated",
    });
  }
};
