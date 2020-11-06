import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "fx" is now active!');

  let stripBlockComments = vscode.commands.registerCommand(
    'fx.stripBlockComments',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const text = editor.document.getText();
        console.log(text.match(/\/\*(.|\s)*\*\//g));
        editor.edit((ed) => {
          ed.replace(
            new vscode.Range(
              new vscode.Position(0, 0),
              new vscode.Position(editor.document.lineCount + 1, 0)
            ),
            text.replace(/\/\*([^\/\*]|\/|\s)*\*\//g, '')
          );
        });
      }
    }
  );

  context.subscriptions.push(stripBlockComments);
}

export function deactivate() {}
