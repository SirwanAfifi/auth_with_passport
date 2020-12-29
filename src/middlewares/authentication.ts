import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";

export type MyRequest = Request & { session: Session & { userId: number } };

export const Authentication = (
  req: MyRequest,
  _: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    throw new Error("not authenticated");
  }
  return next();
};
