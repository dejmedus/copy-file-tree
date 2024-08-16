import * as vscode from "vscode";

export default function getSettings() {
  const config = vscode.workspace.getConfiguration("copyFileTree");

  if (!config) {
    vscode.window.showErrorMessage(
      "No configuration found for Copy file tree extension"
    );
    return { ignoreEnvFiles: true, ignoreGitIgnore: true };
  }

  const ignoreEnvFiles = config.get("ignoreEnvironmentFiles");
  const ignoreGitIgnore = config.get("ignoreGitIgnore");

  console.log("settings", ignoreEnvFiles, ignoreGitIgnore);

  if (
    typeof ignoreEnvFiles !== "boolean" ||
    typeof ignoreGitIgnore !== "boolean"
  ) {
    vscode.window.showErrorMessage(
      "Invalid configuration found for Copy file tree extension"
    );
    return { ignoreEnvFiles: true, ignoreGitIgnore: true };
  }

  return { ignoreEnvFiles, ignoreGitIgnore };
}
