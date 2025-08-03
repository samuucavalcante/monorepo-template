import { ActionType } from "plop";
import path from "path";

export class CreateInterface {
  public actions: ActionType[] = [];

  constructor(private arcPath: string) {
    this.execute();
  }

  private execute() {
    this.generateInterface();
    this.modifyPackageJsonIfNecessary();
  }

  private generateInterface() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/interfaces/{{camelCase module_name}}.interface.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/interface.hbs"),
      skipIfExists: true,
    });

    this.actions.push({
      type: "add",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/interfaces/index.ts"
      ),
      template: "export * from './{{camelCase module_name}}.interface'",
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

        const subpath = `./${moduleName}/interfaces`;
        const newExport = {
          import: `./dist/modules/${moduleName}/interfaces/index.js`,
          types: `./dist/modules/${moduleName}/interfaces/index.d.ts`,
        };

        const existing = json.exports[subpath];

        if (!existing) json.exports[subpath] = newExport;

        return JSON.stringify(json, null, 2);
      },
    });
  }
}
