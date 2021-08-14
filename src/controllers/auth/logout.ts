import { Request, Response, Router } from "express";
import cookie from "cookie";

const logout = (_: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "token", {
      // the cookie cannot be acces by javascript
      httpOnly: true,
      // that must be true, that means that this cookie would be send by https
      secure: process.env.NODE_ENV === "production",
      // this mean that we only accept from our domains
      sameSite: "strict",
      // the cookie will be expires immediatly because we can't deleted
      expires: new Date(0),
      // this in what route the cookie would be valid
      path: "/",
    })
  );

  return res.status(200).json({ succes: true });
};

export default logout;
