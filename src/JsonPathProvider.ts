import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class JsonPathProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "jsonPathFinder";

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    const activeEditor = vscode.window.activeTextEditor;
    const jsonContent = activeEditor?.document.languageId === "json" ? activeEditor.document.getText() : "";

    webviewView.webview.html = this.getWebviewContent(webviewView.webview, jsonContent);
  }

  public getWebviewContent(webview: vscode.Webview, jsonContent: string = "") {
    // Read the HTML file
    const htmlPath = path.join(this._extensionUri.fsPath, "src", "views", "webview.html");
    let html = fs.readFileSync(htmlPath, "utf8");

    // Replace placeholder with actual JSON content
    html = html.replace("{{JSON_CONTENT}}", jsonContent.replace(/"/g, "&quot;"));

    return html;
  }
}
