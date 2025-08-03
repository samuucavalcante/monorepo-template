import { ActionType } from "plop";
import path from "path";

export class CreateController {
  public actions: ActionType[] = [];

  constructor(private moduleApiPath: string, private arcPath: string) {
    this.execute();
  }

  execute() {
    this.generateController();
  }

  private generateController() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.moduleApiPath,
        "{{camelCase module_name}}/useCases/{{camelCase useCase_name}}/{{camelCase module_name}}.{{camelCase useCase_name}}.controller.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/controller.hbs"),
    });
  }
}
