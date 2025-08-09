import { ActionType } from "plop";
import path from "path";

export class CreateEntity {
  public actions: ActionType[] = [];

  constructor(private arcPath: string) {
    this.execute();
  }

  private execute() {
    this.generateEntity();
    this.modifyPackageJsonIfNecessary();
  }

  private generateEntity() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/entities/{{camelCase module_name}}.entity.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/entity.hbs"),
      skipIfExists: true,
    });

    this.actions.push({
      type: "add",
      path: path.join(
        this.arcPath,
        "src/modules/{{camelCase module_name}}/entities/index.ts"
      ),
      template: "export * from './{{camelCase module_name}}.entity'",
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

        const subpath = `./${moduleName}/entities`;
        const newExport = {
          import: `./dist/modules/${moduleName}/entities/index.js`,
          types: `./dist/modules/${moduleName}/entities/index.d.ts`,
        };

        const existing = json.exports[subpath];

        if (!existing) json.exports[subpath] = newExport;

        return JSON.stringify(json, null, 2);
      },
    });
  }
}
