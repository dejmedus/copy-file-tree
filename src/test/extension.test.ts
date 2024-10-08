import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";

import getIgnoredFiles from "../helpers/ignoreFiles";

suite("Configuration", () => {
  test("Valid Configuration", () => {
    const config = vscode.workspace.getConfiguration("copyFileTree");

    assert.ok(config, "Configuration object should be valid");
    assert.strictEqual(typeof config, "object");
  });

  test("Get Settings", () => {
    const config = vscode.workspace.getConfiguration("copyFileTree");

    const ignoreEnvFiles = config.get("ignoreEnvironmentFiles", null);
    const ignoreGitIgnore = config.get("ignoreGitIgnore", null);

    assert.strictEqual(typeof ignoreEnvFiles, "boolean");
    assert.strictEqual(typeof ignoreGitIgnore, "boolean");
  });

  test("Get ignored files", () => {
    const ignoreEnvFiles = true;
    const ignoreGitIgnore = false;

    const customIgnoredFiles = ["node_modules", "dist"];

    const ignoredFiles = getIgnoredFiles("dir", {
      ignoreEnvFiles,
      ignoreGitIgnore,
      customIgnoredFiles,
    });

    assert.ok(ignoredFiles, "Ignored files should be valid");
    assert.ok(ignoredFiles.includes("node_modules"));
    assert.ok(ignoredFiles.includes(".vscode"));
  });
});
