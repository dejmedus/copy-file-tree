import * as fs from "fs";
import * as path from "path";

import getSettings from "./getSettings";

/**
 * Retrieves the list of files to be ignored based on the settings.
 *
 * @param {string} dir - The directory containing the .gitignore.
 * @returns {string[]} - An array of ignored file paths.
 */
export default function getIgnoredFiles(
  dir: string,
  testSettings?: any
): string[] {
  const { ignoreEnvFiles, ignoreGitIgnore, customIgnoredFiles } =
    testSettings || getSettings();
  const ignoreFiles: string[] = [];

  if (ignoreEnvFiles) {
    ignoreFiles.push(...defaultIgnoredFiles);
  }

  if (ignoreGitIgnore) {
    const gitignore = path.join(dir, ".gitignore");
    if (fs.existsSync(gitignore)) {
      const gitignoreContent = fs.readFileSync(gitignore, "utf8");
      const filteredLines = gitignoreContent
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"));
      ignoreFiles.push(...filteredLines);
    }
  }

  if (customIgnoredFiles.length > 0) {
    ignoreFiles.push(...customIgnoredFiles);
  }
  return ignoreFiles;
}

/*
 * Checks if a file should be ignored
 * based on the default list and .gitignore file
 *
 * @returns boolean
 */
export function ignoreFile(filePath: string, ignoredFiles: string[]): boolean {
  return ignoredFiles.some((ignoredFile) => filePath.includes(ignoredFile));
}

const defaultIgnoredFiles = [
  "node_modules",
  "dist",
  "build",
  "out",
  "coverage",
  ".next",
  ".git",
  ".DS_Store",
  ".vscode",
  "temp",
  "logs",
  "__pycache__",
  ".venv",
  "env",
  "venv",
  "target",
  ".idea",
  ".classpath",
  ".project",
  ".bundle",
  "vendor/bundle",
  "vendor",
  "bin",
  "pkg",
  "CMakeFiles",
  ".stack-work",
  "_build",
  "deps",
  ".dart_tool",
  ".flutter-plugins",
  ".packages",
];
