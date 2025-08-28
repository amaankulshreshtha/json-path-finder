# JSON Path Finder

A VSCode extension that helps you easily find and copy paths to any property in JSON files. Think of it as findjsonpath.com, but built right into your editor!

## 🚀 What it does

- **Visual JSON Tree**: See your JSON data in an easy-to-navigate tree structure
- **Click to Get Path**: Click any property to instantly see its JSONPath
- **One-Click Copy**: Copy the path to your clipboard with a single click
- **Real-time Parsing**: Paste JSON and see the tree immediately
- **Error Handling**: Clear error messages for invalid JSON

## 📸 How it looks

The extension opens a side panel showing:

- A text area to paste your JSON
- An interactive tree view of your JSON structure
- The path to any selected property
- Copy button to grab the path instantly

## 🎯 How to use

1. **Open a JSON file** in VSCode
2. **Activate the extension** using any of these methods:

   - Press `Ctrl+Shift+J` (or `Cmd+Shift+J` on Mac)
   - Right-click in your JSON file → "Open JSON Path Finder"
   - Command Palette (`Ctrl+Shift+P`) → "Open JSON Path Finder"

3. **Paste your JSON** into the text area
4. **Click "Parse JSON"** to see the tree structure
5. **Click any property** in the tree to see its path
6. **Click "Copy"** to copy the path to your clipboard

## ✨ Example

For this JSON:

```json
{
  "users": [
    {
      "name": "John",
      "details": {
        "email": "john@example.com"
      }
    }
  ]
}
```

Clicking on `email` gives you: `$.users[0].details.email`

## 🔧 Installation

**For Development:**

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press `F5` to test

**For Distribution:**

1. Install from a `.vsix` file: Extensions → "..." → "Install from VSIX..."

## ⌨️ Keyboard Shortcuts

- `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac): Open JSON Path Finder

## 🎨 Features

- **VSCode Theme Integration**: Matches your current VSCode theme perfectly
- **Syntax Highlighting**: Proper colors for different JSON value types
- **Expandable Tree**: Collapse/expand objects and arrays
- **Error Feedback**: Clear messages when JSON is invalid
- **Fast Performance**: Works smoothly even with large JSON files

## 🔄 Workflow

This extension fits perfectly into these workflows:

- **API Testing**: Quickly find paths for API response validation
- **Configuration Files**: Navigate complex config structures
- **Data Analysis**: Explore JSON data structures
- **Documentation**: Get exact paths for documentation

## 🤝 Why use this?

- **No context switching**: Stay in VSCode instead of going to external websites
- **Faster than manual counting**: No need to manually trace through nested objects
- **Team sharing**: Easy to share .vsix file with teammates
- **Offline**: Works without internet connection

## 📝 Requirements

- VSCode 1.74.0 or higher
- Works with `.json` and `.jsonc` files

## 🐛 Known Issues

None at the moment! If you find any bugs, please let us know.

## 📚 Release Notes

### 1.0.0

- Initial release
- Visual JSON tree with click-to-copy paths
- VSCode theme integration
- Keyboard shortcuts and context menus

---

**Enjoy finding those JSON paths! 🎉**
