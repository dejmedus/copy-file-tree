// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import defaultIgnoredFiles from "./defaultIgnoredFiles";

const ignoreDefaults = true;
const ignoreGitignore = true;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "copy-filetree" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must m5atch the command field in package.json
  let disposable = vscode.commands.registerCommand("copy-filetree.copy", () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
      // get terminal path?

      const rootPath = workspaceFolders[0].uri.fsPath;
      const tree = buildFileTree(rootPath, "");
      vscode.env.clipboard.writeText(tree).then(() => {
        vscode.window.showInformationMessage("File tree copied to clipboard!");
      });
    }
  });

  function buildFileTree(dir: string, indent: string): string {
    const items = fs.readdirSync(dir);
    let tree = "";

    items.forEach((item, index) => {
      const fullPath = path.join(dir, item);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      const isLastItem = index === items.length - 1;

      if ((ignoreDefaults || ignoreGitignore) && ignoreFile(dir, fullPath)) {
        return;
      }

      const connector = isLastItem ? "└── " : "├── ";
      const nextIndent = isLastItem ? "    " : "│   ";

      tree += `${indent}${connector}${item}\n`;

      if (isDirectory) {
        tree += buildFileTree(fullPath, indent + nextIndent);
      }
    });

    console.log(tree);
    return tree;
  }

  context.subscriptions.push(disposable);
}

/*
 * Checks if a file should be ignored
 * based on the default list and .gitignore file
 *
 * @returns boolean
 */
function ignoreFile(dir: string, fullPath: string): boolean {
  const ignoreFiles: string[] = [];

  if (ignoreDefaults) {
    ignoreFiles.push(...defaultIgnoredFiles);
  }

  if (ignoreGitignore) {
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

// This method is called when your extension is deactivated
export function deactivate() {}
