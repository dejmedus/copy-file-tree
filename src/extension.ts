// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import getIgnoredFiles from "./helpers/ignoreFiles";
import buildFileTree from "./helpers/buildFileTree";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "copyFileTree.copyFileTree",
    () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folders found!");
        return;
      }
      // get terminal path?
      const rootPath = workspaceFolders[0].uri.fsPath;
      const ignoredFiles = getIgnoredFiles(rootPath);
      const tree = buildFileTree(rootPath, "", ignoredFiles);
      vscode.env.clipboard.writeText(tree).then(() => {
        vscode.window.showInformationMessage("File tree copied to clipboard!");
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
