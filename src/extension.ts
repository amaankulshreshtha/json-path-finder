import * as vscode from "vscode";
import { JsonPathProvider } from "./JsonPathProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 JSON Path Finder extension is activating...");

  const provider = new JsonPathProvider(context.extensionUri);

  context.subscriptions.push(vscode.window.registerWebviewViewProvider("jsonPathFinder", provider));

  context.subscriptions.push(
    vscode.commands.registerCommand("jsonPathFinder.openViewer", () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      if (activeEditor.document.languageId !== "json" && activeEditor.document.languageId !== "jsonc") {
        vscode.window.showErrorMessage("Please open a JSON file first");
        return;
      }

      // Create and show webview panel
      const panel = vscode.window.createWebviewPanel("jsonPathFinder", "JSON Path Finder", vscode.ViewColumn.Beside, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });

      panel.webview.html = provider.getWebviewContent(panel.webview, activeEditor.document.getText());

      // Listen for messages from the webview
      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case "copyPath":
              vscode.env.clipboard.writeText(message.path);
              vscode.window.showInformationMessage(`Path copied: ${message.path}`);
              break;
            case "error":
              vscode.window.showErrorMessage(message.text);
              break;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

export function deactivate() {}
