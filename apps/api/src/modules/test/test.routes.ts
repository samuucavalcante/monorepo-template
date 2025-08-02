import { Router } from "express";

// plop-import
import { TestCreateController } from './useCases/create/test.create.controller'

// plop-instance
const testCreateController = new TestCreateController()

const testRouter = Router();

// plop-route
testRouter.post("/test/", testCreateController.handler);

export default testRouter;
