import { ActionType } from "plop";
import path from "path";

export class CreateRouter {
  public actions: ActionType[] = [];

  constructor(private moduleApiPath: string, private arcPath: string) {
    this.execute();
  }

  execute() {
    this.generateRouter();
  }

  private generateRouter() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/routes.hbs"),
      skipIfExists: true,
    });

    this.actions.push({
      type: "append",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
      ),
      pattern: "// plop-import",
      template: `import { {{pascalCase module_name}}{{pascalCase useCase_name}}Controller } from './useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.controller'`,
    });

    this.actions.push({
      type: "append",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
      ),
      pattern: "// plop-instance",
      template: `const {{camelCase module_name}}{{pascalCase useCase_name}}Controller = new {{pascalCase module_name}}{{pascalCase useCase_name}}Controller()`,
    });

    this.actions.push({
      type: "append",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/{{camelCase module_name}}.routes.ts"
      ),
      pattern: "// plop-route",
      template: `{{camelCase module_name}}Router.{{lowerCase http_verb_name}}("/{{camelCase module_name}}/{{kebabCase controller_name}}", {{camelCase module_name}}{{pascalCase useCase_name}}Controller.handler);`,
    });
  }
}
