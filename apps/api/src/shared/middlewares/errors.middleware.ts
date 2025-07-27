import { AppError } from "@shared/error";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

export function errorsMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);

  res.status(err.code || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
