import express from "express";
import "reflect-metadata";

import "./shared/container";
import "./shared/mongo";

import { errorsMiddleware } from "@shared/middlewares/errors.middleware";
import { appRouter } from "./shared/routes";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(appRouter);

app.use(errorsMiddleware);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
