import * as fs from "fs";
import * as path from "path";

import defaultIgnoredFiles from "./defaultIgnoredFiles";

/*
 * Checks if a file should be ignored
 * based on the default list and .gitignore file
 *
 * @returns boolean
 */
export default function ignoreFile(
  dir: string,
  fullPath: string,
  settings: any
): boolean {
  const { ignoreEnvFiles, ignoreGitIgnore } = settings;

  const ignoreFiles: string[] = [];

  if (!ignoreEnvFiles && !ignoreGitIgnore) {
    return false;
  }

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

  for (const file of ignoreFiles) {
    if (fullPath.includes(file)) {
      return true;
    }
  }

  return false;
}
