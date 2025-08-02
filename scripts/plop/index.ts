import { type NodePlopAPI } from "plop";
import path from "path";

export default function (plop: NodePlopAPI) {
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
    actions: [
      // UseCase
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.useCase.ts"
        ),
        templateFile: path.resolve(__dirname, "./templates/useCase.hbs"),
        skipIfExists: true,
      },
      // DTO
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.dto.ts"
        ),
        templateFile: path.resolve(__dirname, "./templates/useCaseDto.hbs"),
        skipIfExists: true,
      },
      // Controller
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.controller.ts"
        ),
        templateFile: path.resolve(__dirname, "./templates/controller.hbs"),
      },
      // Routes file base (caso ainda não exista)
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
        ),
        templateFile: path.resolve(__dirname, "./templates/routes.hbs"),
        skipIfExists: true,
      },
      {
        type: "append",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
        ),
        pattern: "// plop-import",
        template: `import { {{pascalCase module_name}}{{pascalCase useCase_name}}Controller } from './useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.controller'`,
      },
      {
        type: "append",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
        ),
        pattern: "// plop-instance",
        template: `const {{camelCase module_name}}{{pascalCase useCase_name}}Controller = new {{pascalCase module_name}}{{pascalCase useCase_name}}Controller()`,
      },
      {
        type: "append",
        path: path.resolve(
          __dirname,
          "../..",
          "apps/api/src/modules/{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
        ),
        pattern: "// plop-route",
        template: `{{camelCase module_name}}Router.{{lowerCase http_verb_name}}("/{{camelCase module_name}}/{{kebabCase controller_name}}", {{camelCase module_name}}{{pascalCase useCase_name}}Controller.handler);`,
      },
    ],
  });
}
