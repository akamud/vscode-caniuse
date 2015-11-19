import * as vscode from 'vscode'; 
import * as request from 'request';

var selectedBrowsers = ['ie', 'firefox' , 'chrome', 'safari', 'opera'];

export function activate(context: vscode.ExtensionContext) {
	var disposable = vscode.commands.registerCommand('extension.canIUse', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var expandedSelection = undefined;
        expandedSelection = getSelection(editor);
        if (expandedSelection)
        {
            var word = editor.document.getText(expandedSelection);
            word && retrieveInformation(word.toLowerCase(), expandedSelection);
        }
	});
	
	context.subscriptions.push(disposable);
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

function retrieveInformation(word:string, selection: vscode.Selection)
{
    if (word)
    {
        request({
            json: true,
            uri: 'https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json',
            gzip: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var rule = body.data[word];
                
                if (rule && showInformation(rule))
                {
                    return;
                }
            }
            
            vscode.window.setStatusBarMessage("Can I Use: entry not found", 5000);
        });
    }
}

function showInformation(data) : boolean {
    var stats = data.stats;
    var result = [];
    for (var i = 0; i < selectedBrowsers.length; i++) {
        var browser = stats[selectedBrowsers[i]];
        var version = getVersion(browser);
        if (version)
            result.push(selectedBrowsers[i] + ": "+ version);
    }
    
    if (result && result.length > 0)
    {
        vscode.window.setStatusBarMessage("Can I Use: " + result.join(" | "), 5000);
        return true;
    }
    
    return false;
}

function getVersion(stats:any) : string {
    var keys = Object.keys(stats).sort(function (a, b) {
        var aNumber = +a;
        var bNumber = +b;
        return aNumber > bNumber ? 1 : aNumber == bNumber ? 0: -1 ;
    });
    
    var found = [];
    for (var i = 0; i < keys.length; i++) {
        var element = keys[i];
        if (stats[keys[i]].indexOf("a") >= 0 || stats[keys[i]].indexOf("y") >= 0)
        {
            found.push(keys[i]);
        }
    }
    
    var versions = [];
    var first = found.shift();
    var last = found.pop();
    if (first)
        versions.push(first);
    if (last)
        versions.push(last);
    
    return versions.join("-");
}