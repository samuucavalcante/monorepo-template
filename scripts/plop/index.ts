import path from "path";
import { type NodePlopAPI } from "plop";

import { CreateUseCase } from "./services/create.useCase.plop";
import { CreateController } from "./services/create.controller.plop";
import { CreateRouter } from "./services/create.router.plop";
import { CreateEntity } from "./services/create.entity.plop";
import { CreateRepository } from "./services/create.repository.plop";
import { appendIfNotExists } from "./utils/appendIfNotExistsParams.plop";
import { CreateActions } from "./services/create.actions.plop";

const moduleApiPath = path.resolve(
  __dirname,
  "..",
  "..",
  "apps/api/src/modules"
);
const moduleWebPath = path.resolve(
  __dirname,
  "..",
  "..",
  "apps/web/src/modules"
);
const arcPath = path.resolve(__dirname, "..", "..", "packages/arc");

const createUseCase = new CreateUseCase(moduleApiPath, arcPath);
const createController = new CreateController(moduleApiPath, arcPath);
const createRouter = new CreateRouter(moduleApiPath, arcPath);
const createEntity = new CreateEntity(arcPath);
const createRepository = new CreateRepository(moduleApiPath);
const createActions = new CreateActions(moduleWebPath);

const actions = [
  // UseCase & DTO
  ...createUseCase.actions,

  // Controller
  ...createController.actions,

  // Router
  ...createRouter.actions,

  // Interface
  ...createEntity.actions,

  // Repository
  ...createRepository.actions,

  // Actions
  ...createActions.actions,
];

export default function (plop: NodePlopAPI) {
  plop.setActionType("append-if-not-exists", appendIfNotExists);
  plop.setGenerator("useCase", {
    description: "Cria um useCase",
    prompts: [
      {
        type: "input",
        name: "module_name",
        message: "Nome do módulo:",
      },
      {
        type: "input",
        name: "useCase_name",
        message: "Nome do useCase:",
      },
      {
        type: "input",
        name: "controller_name",
        message: (answers) =>
          `Nome do endpoint (prefixo: /${answers.module_name}):`,
      },
      {
        type: "input",
        name: "http_verb_name",
        message: "Verbo HTTP (GET, POST, PUT, PATCH, OPTIONS):",
        validate: (input: string) => {
          const verbs = ["GET", "POST", "PUT", "PATCH", "OPTIONS"];
          return verbs.includes(input.toUpperCase()) || "Verbo inválido.";
        },
        filter: (input: string) => input.toUpperCase(),
      },
    ],
    actions,
  });
}
