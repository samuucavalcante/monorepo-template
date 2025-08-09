import path from "path";
import { type NodePlopAPI } from "plop";

import { CreateUseCase } from "./services/create.useCase.plop";
import { CreateController } from "./services/create.controller.plop";
import { CreateRouter } from "./services/create.router.plop";
import { CreateEntity } from "./services/create.entity.plop";
import { CreateRepository } from "./services/create.repository.plop";
import { appendIfNotExists } from "./utils/appendIfNotExistsParams.plop";

const modulePath = path.resolve(__dirname, "..", "..", "apps/api/src/modules");
const arcPath = path.resolve(__dirname, "..", "..", "packages/arc");

const createUseCase = new CreateUseCase(modulePath, arcPath);
const createController = new CreateController(modulePath, arcPath);
const createRouter = new CreateRouter(modulePath, arcPath);
const createEntity = new CreateEntity(arcPath);
const createRepository = new CreateRepository(modulePath);

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
