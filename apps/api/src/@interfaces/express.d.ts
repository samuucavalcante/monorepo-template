import type { JwtPayload } from "@shared/middlewares/ensureAuthenticated.middleware";
import * as express from "express";

declare global {
  namespace Express {
    interface Request extends JwtPayload {}
  }
}
