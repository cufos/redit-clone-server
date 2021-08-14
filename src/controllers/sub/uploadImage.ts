import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// entities
import { Sub } from "../../entities/Sub";
import { User } from "../../entities/User";

// helpers
import { makeId } from "../../util/helpers";

export const ownSub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;

  try {
    const sub = await Sub.findOneOrFail({ where: { name: req.params.name } });

    if (sub.username !== user.username) {
      return res.status(403).json({ error: "You dont own this sub" });
    }

    res.locals.sub = sub;

    return next();
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images",
    filename: (_, file, callback) => {
      const name = makeId(15);
      callback(null, name + path.extname(file.originalname));
    },
  }),
  fileFilter: (_, file, callback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      callback(new Error("File type not supported"));
    }
  },
});

export const uploadImage = async (req: Request, res: Response) => {
  const sub: Sub = res.locals.sub;
  try {
    const type = req.body.type;

    if (type !== "image" && type !== "banner") {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Invalid type" });
    }

    let oldImageUrn: string = "";
    if (type === "image") {
      oldImageUrn = sub.imageUrn || "";
      sub.imageUrn = req.file.filename;
    } else if (type === "banner") {
      oldImageUrn = sub.bannerUrn || "";
      sub.bannerUrn = req.file.filename;
    }

    await sub.save();

    if (oldImageUrn !== "") {
      fs.unlinkSync(`public\\images\\${oldImageUrn}`);
    }

    return res.json(sub);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
