import { AppError } from "@shared/error";
import type { Request, Response, NextFunction } from "express";

export function errorsMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  (res as unknown as { _hasError: boolean })._hasError = true;

  if (err instanceof AppError) {
    return res.status(err.params.code!).json({
      success: false,
      message: err.params.message,
      messagePt: err.params.messagePt,
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    messagePt: "Erro interno do servidor",
  });
}
