import fs from "fs";
import type { CustomActionFunction } from "plop";
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const appendIfNotExists: CustomActionFunction = async (
  answers,
  configRaw,
  plop
) => {
  const config = configRaw as unknown as {
    path: string;
    pattern: string;
    template: string;
  };

  const filePath = config.path;
  const pattern = config.pattern;

  const contentToInsert = plop.renderString(config.template, answers).trim();

  if (!fs.existsSync(filePath)) {
    return `File ${filePath} does not exist`;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  // Testa se o conteúdo já está no arquivo ignorando espaços
  const contentRegex = new RegExp(
    escapeRegExp(contentToInsert).replace(/\s+/g, "\\s+"),
    "m"
  );

  if (contentRegex.test(fileContent)) {
    return `Skipped: content already exists in ${filePath}`;
  }

  const lines = fileContent.split("\n");
  const insertIndex = lines.findIndex((line) => line.includes(pattern));

  if (insertIndex === -1) {
    return `Pattern "${pattern}" not found in ${filePath}`;
  }

  lines.splice(insertIndex + 1, 0, contentToInsert);
  fs.writeFileSync(filePath, lines.join("\n"));

  return `Appended content to ${filePath}`;
};
