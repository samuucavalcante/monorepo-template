import { ActionType } from "plop";
import path from "path";

export class CreateUseCase {
  public actions: ActionType[] = [];

  constructor(private moduleApiPath: string, private arcPath: string) {
    this.execute();
  }

  private execute() {
    this.generateUseCase();
    this.modifyPackageJsonIfNecessary();
  }

  private generateUseCase() {
    this.actions.push({
      type: "add",
      path: this.path,
      templateFile: this.templateFile,
      skipIfExists: true,
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

  private get path(): string {
    return path.join(
      this.moduleApiPath,
      "{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.useCase.ts"
    );
  }

  private get templateFile(): string {
    return path.resolve(__dirname, "..", "templates/useCase.hbs");
  }
}
