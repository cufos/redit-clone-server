import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import { isEmpty } from "class-validator";
const secret = process.env.SECRET;

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(username)) {
      errors.username = "Username must not be empty";
    }

    if (isEmpty(password)) {
      errors.password = "Password must not be empty";
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ username: "Invalid credentials" });

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ password: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, secret);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        // the cookie cannot be acces by javascript
        httpOnly: true,
        // that must be true, that means that this cookie would be send by https
        secure: process.env.NODE_ENV === "production",
        // this mean that we only accept from our domains
        sameSite: "strict",
        // how long this cookie is valid
        maxAge: 3600,
        // this in what route the cookie would be valid
        path: "/",
      })
    );

    return res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong" });
  }
};

export default login;
