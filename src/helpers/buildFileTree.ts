import fs from "fs";
import path from "path";
import { ignoreFile } from "./ignoreFiles";

/**
 * Builds a file tree string
 *
 * @param {string} dir - The directory to build the file tree from.
 * @param {string} indent - The string used for indentation.
 * @param {string[]} ignoredFiles - The list of files to ignore.
 * @returns {string} - The file tree string.
 */
export default function buildFileTree(
  dir: string,
  indent: string = "",
  ignoredFiles: string[] = []
): string {
  // vscode sorts directories first, then files alphabetically
  const items = fs.readdirSync(dir).sort((a, b) => {
    const aIsDirectory = fs.lstatSync(path.join(dir, a)).isDirectory();
    const bIsDirectory = fs.lstatSync(path.join(dir, b)).isDirectory();

    if (aIsDirectory && !bIsDirectory) {
      return -1;
    }
    if (!aIsDirectory && bIsDirectory) {
      return 1;
    }
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });

  let tree = "";

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();
    const isLastItem = index === items.length - 1;

    if (ignoreFile(fullPath, ignoredFiles)) {
      return;
    }

    const connector = isLastItem ? "└── " : "├── ";
    const nextIndent = isLastItem ? "    " : "│   ";

    tree += `${indent}${connector}${item}\n`;

    if (isDirectory) {
      tree += buildFileTree(fullPath, indent + nextIndent, ignoredFiles);
    }
  });

  return tree;
}
