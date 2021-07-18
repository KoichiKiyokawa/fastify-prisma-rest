import express from "express";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user";
import {
  respondInternalServerError,
  respondOK,
  respondUnauthorized,
} from "./core";
import { Request } from "./core";

type LoginBody = {
  email: string;
  password: string;
};

export const AuthLogin = async (req: Request, res: express.Response) => {
  const { email, password } = req.body as LoginBody;
  const user = await UserRepository.findByEmail(email);
  const commonErrorMessage = "email or password is wrong.";
  if (user == null) return respondUnauthorized(res, commonErrorMessage);

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return respondInternalServerError(res, commonErrorMessage);

  // write to session
  req.session.user = user;
  respondOK(res, "ok");
};

export const AuthLogout = async (req: Request, res: express.Response) => {
  req.session.user = undefined;
  respondOK(res, "ok");
};

export const AuthCheck = async (req: Request, res: express.Response) => {
  if (req.session.user == null) return respondUnauthorized(res, "unauthorized");
  respondOK(res, "ok");
};
