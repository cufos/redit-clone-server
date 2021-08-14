import { Request, Response } from "express";

const me = (_: Request, res: Response) => {
  return res.locals.user;
};

export default me;
