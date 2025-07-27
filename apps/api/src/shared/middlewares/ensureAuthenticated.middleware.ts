import { AppError } from "@shared/error";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

export interface JwtPayload {
  userId: string;
  barbershopId: string;
}

export function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) throw new AppError("Usuário inválido", 401);

  const [, token] = authorization.split(" ");
  if (!token) throw new AppError("Usuário inválido", 401);

  try {
    const payload = jwt.verify(token, process.env.JWT_WEB_TOKEN!) as JwtPayload;

    req.userId = payload.userId;

    next();
  } catch (err) {
    throw new AppError("Token inválido ou expirado", 401);
  }
}
