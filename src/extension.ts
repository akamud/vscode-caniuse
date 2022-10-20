import * as vscode from 'vscode';
import {CanIUse} from './can-i-use';

const exec = require('child_process').exec;

export function activate(context: vscode.ExtensionContext) {
    var disposable = vscode.commands.registerCommand('extension.canIUse', () => {
        let caniuse = new CanIUse();

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var expandedSelection = undefined;
        expandedSelection = getSelection(editor);
        if (expandedSelection) {
            var word = editor.document.getText(expandedSelection);
            if (word) {
                caniuse.retrieveInformation(caniuse.getNormalizedRule(word).toLowerCase(), showOutput);
            }
        }
    });

    context.subscriptions.push(disposable);

    var openCIU = vscode.commands.registerCommand('extension.openCanIUse', function () {
       let caniuse = new CanIUse();

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var expandedSelection = undefined;
        expandedSelection = getSelection(editor);
        if (expandedSelection) {
            var word = editor.document.getText(expandedSelection);
            if (word) {
                let openCommand = '';
                switch(process.platform) {
                    case 'darwin':
                        openCommand = 'open ';
                        break;
                    case 'win32':
                        openCommand = 'start ';
                        break;
                    default:
                        return;
                }
                exec(openCommand + "http://caniuse.com/" + word);
            }
        }
    });

    context.subscriptions.push(openCIU);
}

function getSelection(editor: vscode.TextEditor): vscode.Selection {
    const selection = editor.selection;
    if (selection.isEmpty) {
        const wordRange = editor.document.getWordRangeAtPosition(selection.active);
        if (typeof wordRange != 'undefined') {
            var expandedSelection = new vscode.Selection(wordRange.start.line, wordRange.start.character, wordRange.end.line, wordRange.end.character);
            return expandedSelection;
        } else {
            return undefined;
        }
    } else {
        return selection;
    }
}

function showOutput(message: string) {
    vscode.window.setStatusBarMessage(message, 5000);
}
