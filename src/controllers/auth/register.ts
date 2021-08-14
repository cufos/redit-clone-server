import { Request, Response } from "express";
import { User } from "../../entities/User";
import { validate } from "class-validator";

const mapErrors = (errors: any) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};

    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errors.email = "Email already taken";
    if (usernameUser) errors.username = "Username already taken";

    if (Object.keys(errors).length > 0) {
      res.status(400).json(errors);
    }
    const user = new User({ email, username, password });

    errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default register;
