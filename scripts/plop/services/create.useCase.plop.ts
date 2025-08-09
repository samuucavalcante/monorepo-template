import { ActionType } from "plop";
import path from "path";

export class CreateUseCase {
  public actions: ActionType[] = [];

  constructor(private moduleApiPath: string, private arcPath: string) {
    this.execute();
  }

  private execute() {
    this.generateUseCase();
    this.generateDTO();
    this.modifyPackageJsonIfNecessary();
  }

  private generateUseCase() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.useCase.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/useCase.hbs"),
      skipIfExists: true,
    });
  }

  private generateDTO() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.dto.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/useCaseDto.hbs"),
      skipIfExists: true,
    });

    this.actions.push({
      type: "add",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/useCases/index.ts"
      ),
      template: "// useCasesDTO",
      skipIfExists: true,
    });

    this.actions.push({
      type: "append",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/useCases/index.ts"
      ),
      pattern: "// useCasesDTO",
      template: `export * from "./{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.dto";`,
    });
  }

  private modifyPackageJsonIfNecessary() {
    this.actions.push({
      type: "modify",
      path: path.join(this.arcPath, "package.json"),
      transform(fileContent, data) {
        const json = JSON.parse(fileContent);
        const moduleName = data.module_name;

        const subpath = `./${moduleName}/useCases`;
        const newExport = {
          import: `./dist/modules/${moduleName}/useCases/index.js`,
          types: `./dist/modules/${moduleName}/useCases/index.d.ts`,
        };

        const existing = json.exports[subpath];

        if (!existing) json.exports[subpath] = newExport;

        return JSON.stringify(json, null, 2);
      },
    });
  }
}
