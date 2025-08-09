import { ActionType } from "plop";
import path from "path";

export class CreateActions {
  public actions: ActionType[] = [];

  constructor(private moduleWebPath: string) {
    this.execute();
  }

  execute() {
    this.generateActions();
  }

  private generateActions() {
    this.actions.push({
      type: "add",
      path: path.join(
        this.moduleWebPath,
        "{{camelCase module_name}}/actions/{{camelCase module_name}}.{{camelCase useCase_name}}.action.ts"
      ),
      templateFile: path.resolve(__dirname, "..", "templates/actions.hbs"),
    });
  }
}
