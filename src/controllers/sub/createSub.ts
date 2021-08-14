import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

// entities
import { Sub } from "../../entities/Sub";
import { User } from "../../entities/User";

export const createSubs = async (req: Request, res: Response) => {
  const { title, name, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};

    if (isEmpty(name)) errors.name = "Name must not be empty";

    if (isEmpty(title)) errors.title = "Title must not be empty";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Sub already exists";

    if (Object.keys(errors).length > 0) {
      throw errors;
    }

    const subToSaved = new Sub({ name, title, description });

    await subToSaved.save();

    return res.json(subToSaved);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
