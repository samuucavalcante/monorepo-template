import express from "express";
import "reflect-metadata";

import "./shared/container";
import "./shared/mongo";

import { errorsMiddleware } from "@shared/middlewares/errors.middleware";
import { appRouter } from "./shared/routes";

const app = express();

app.use(express.json());

app.use(appRouter);

app.use(errorsMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
