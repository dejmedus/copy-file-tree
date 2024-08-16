import * as vscode from "vscode";

export default function getSettings(): {
  /**
   * Whether to ignore environment files.
   */
  ignoreEnvFiles: boolean;

  /**
   * Whether to ignore files listed in .gitignore.
   */
  ignoreGitIgnore: boolean;

  /**
   * An array of custom files to ignore.
   */
  customIgnoredFiles: string[];
} {
  const config = vscode.workspace.getConfiguration("copyFileTree");

  if (!config) {
    vscode.window.showErrorMessage(
      "No configuration found for Copy file tree extension"
    );
    return {
      ignoreEnvFiles: true,
      ignoreGitIgnore: true,
      customIgnoredFiles: [],
    };
  }

  const ignoreEnvFiles = config.get("ignoreEnvironmentFiles");
  const ignoreGitIgnore = config.get("ignoreGitIgnore");
  const customIgnoredFiles = config.get("customIgnoredFiles");

  if (
    typeof ignoreEnvFiles !== "boolean" ||
    typeof ignoreGitIgnore !== "boolean" ||
    !Array.isArray(customIgnoredFiles)
  ) {
    vscode.window.showErrorMessage(
      "Invalid configuration found for Copy file tree extension"
    );
    return {
      ignoreEnvFiles: true,
      ignoreGitIgnore: true,
      customIgnoredFiles: [],
    };
  }

  return { ignoreEnvFiles, ignoreGitIgnore, customIgnoredFiles };
}
