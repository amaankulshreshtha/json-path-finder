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
    // Try different paths based on your actual folder structure
    const possiblePaths = [
      path.join(this._extensionUri.fsPath, "src", "views", "webview.html"), // Development
      path.join(this._extensionUri.fsPath, "out", "views", "webview.html"), // Packaged (webpack copies here)
      path.join(this._extensionUri.fsPath, "views", "webview.html"), // Root views folder
      path.join(this._extensionUri.fsPath, "out", "webview.html"), // Flat in out/
    ];

    let html = "";
    for (const htmlPath of possiblePaths) {
      try {
        if (fs.existsSync(htmlPath)) {
          html = fs.readFileSync(htmlPath, "utf8");
          console.log(`✅ Found webview.html at: ${htmlPath}`);
          break;
        }
      } catch (error) {
        console.log(`❌ Failed to read: ${htmlPath}`);
        continue;
      }
    }

    if (!html) {
      console.log("❌ webview.html not found in any location, using fallback");
      console.log("Searched paths:", possiblePaths);
      // Fallback: return minimal inline HTML if file not found
      return this.getFallbackHtml(jsonContent);
    }

    // Replace placeholder with actual JSON content (escape quotes properly)
    const escapedJsonContent = jsonContent.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    html = html.replace("{{JSON_CONTENT}}", escapedJsonContent);

    return html;
  }

  private getFallbackHtml(jsonContent: string = "") {
    // Minimal fallback HTML - only used if the main HTML file can't be found
    const escapedJsonContent = jsonContent.replace(/"/g, "&quot;").replace(/'/g, "&#39;");

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JSON Path Finder</title>
            <style>
                body {
                    font-family: var(--vscode-font-family), sans-serif;
                    padding: 20px;
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                }
                .error {
                    color: var(--vscode-errorForeground);
                    background-color: var(--vscode-inputValidation-errorBackground);
                    padding: 15px;
                    border-radius: 4px;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="error">
                <h3>⚠️ HTML Template Not Found</h3>
                <p>The webview.html file could not be loaded. This usually happens when:</p>
                <ul>
                    <li>The extension was not properly compiled</li>
                    <li>The HTML file is missing from the extension package</li>
                    <li>The file path configuration is incorrect</li>
                </ul>
                <p><strong>To fix this:</strong></p>
                <ol>
                    <li>Make sure <code>src/views/webview.html</code> exists</li>
                    <li>Run <code>npm run compile</code></li>
                    <li>Check that webpack copied the file to <code>out/views/webview.html</code></li>
                </ol>
            </div>
        </body>
        </html>`;
  }
}
