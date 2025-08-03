import { ActionType } from "plop";
import path from "path";

export class CreateRepository {
  public actions: ActionType[] = [];

  constructor(private moduleApiPath: string) {
    this.execute();
  }

  private execute() {
    this.generateRepository();
    this.generateRepositorySchema();
    this.generateRegisterContainer();
  }

  private generateRepository() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/repositories/{{camelCase module_name}}.repository.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/repository.hbs"),
      skipIfExists: true,
    });
  }

  private generateRepositorySchema() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/repositories/{{camelCase module_name}}.schema.repository.ts"
      ),
      templateFile: path.resolve(
        __dirname,
        "..",
        "templates/repository-schema.hbs"
      ),
      skipIfExists: true,
    });
  }

  private generateRegisterContainer() {
    this.actions.push({
      type: "append-if-not-exists",
      path: path.join(this.moduleApiPath, "..", "shared/container.ts"),

      pattern: "// Imports",
      template: `import { {{pascalCase module_name}}Repository } from "@modules/{{camelCase module_name}}/repositories/{{camelCase module_name}}.repository";`,
    } as unknown as ActionType);

    this.actions.push({
      type: "append-if-not-exists",
      path: path.join(this.moduleApiPath, "..", "shared/container.ts"),
      pattern: "// Repository",
      template: `container.registerSingleton({{pascalCase module_name}}Repository);`,
    } as unknown as ActionType);
  }
}
