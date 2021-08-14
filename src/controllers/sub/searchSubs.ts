import { isEmpty } from "class-validator";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Sub } from "../../entities/Sub";

export const searchSubs = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    if (isEmpty(name)) {
      return res.status(400).json({ error: "Name must not be empty" });
    }

    const subs = await getRepository(Sub)
      .createQueryBuilder()
      .where("LOWER(name) LIKE :name", {
        name: `${name.toLocaleLowerCase().trim()}%`,
      })
      .getMany();

    return res.json(subs);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
