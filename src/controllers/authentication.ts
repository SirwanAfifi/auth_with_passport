import { Request, response, Response, Router } from "express";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../entity/User";
import { Authentication, MyRequest } from "../middlewares/authentication";
const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User();
  user.username = username;
  user.password = hashedPassword;
  user.save();
  return res.json({
    message: `User ${user.username} Created`,
  });
});

router.post("/signin", async (req: MyRequest, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ username: "User not found" });

  const hashResult = await bcrypt.compare(password, user.password);
  if (!hashResult) {
    return res.json("Wrong credentials provided");
  }

  req.session.userId = user.id;
  return res.json({
    message: "Logged In",
  });
});

router.get("/allUsers", Authentication, async (req: Request, res: Response) => {
  const allUsers = await User.find();
  return res.json(allUsers);
});

export default router;
