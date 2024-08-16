import * as fs from "fs";
import * as path from "path";

import ignoreFile from "./ignoreFile";

export default function buildFileTree(
  dir: string,
  indent: string,
  settings: any
): string {
  const items = fs.readdirSync(dir);
  let tree = "";

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();
    const isLastItem = index === items.length - 1;

    if (ignoreFile(dir, fullPath, settings)) {
      return;
    }

    const connector = isLastItem ? "└── " : "├── ";
    const nextIndent = isLastItem ? "    " : "│   ";

    tree += `${indent}${connector}${item}\n`;

    if (isDirectory) {
      tree += buildFileTree(fullPath, indent + nextIndent, settings);
    }
  });

  return tree;
}
