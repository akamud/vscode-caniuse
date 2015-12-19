import * as request from 'request';

export class CanIUse {
    private rulesDictionary = require("../data/rulesDictionary.json");
    private wellSupportedProperties = require("../data/wellSupportedProperties.json");
    private selectedBrowsers = ['IE', 'Firefox', 'Chrome', 'Safari', 'Opera'];

    isWellSupported(word: string): boolean {
        return this.wellSupportedProperties["well-supported-properties"].indexOf(word) >= 0;
    }

    getNormalizedRule(word: string): string {
        let dict = this.rulesDictionary;
        let normalizedRule;
        for (var p in dict) {
            if (word.toLowerCase() == p.toLowerCase()) {
                normalizedRule = dict[p];
                break;
            }
        }
        return normalizedRule || word;
    }

    retrieveInformation(word: string, callback: (s: string) => void): void {
        let caniuse = this;

        if (caniuse.isWellSupported(word)) {
            callback("Can I Use: All browsers ✔ (CSS 2.1 properties, well-supported subset)");
        }
        else {
            request.get({
                json: true,
                uri: 'https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json',
                gzip: true
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var rule = body.data[word];

                    if (rule) {
                        callback(caniuse.getSupportStatus(rule));
                        return;
                    }
                }
                callback("Can I Use: entry not found");
            });
        }
    }

    getSupportStatus(data): string {
        var stats = data.stats;
        var result = [];
        for (var i = 0; i < this.selectedBrowsers.length; i++) {
            var browser = stats[this.selectedBrowsers[i].toLowerCase()];
            var version = this.getVersion(browser);
            if (version) {
                result.push(this.selectedBrowsers[i] + " ✔ " + version);
            }
            else {
                result.push(this.selectedBrowsers[i] + " ✘");
            }
        }

        let message;
        if (result && result.length > 0) {
            message = "Can I Use: " + result.join(" ");
        }
        return message;
    }

    getVersion(stats: any): string {
        var keys = Object.keys(stats).sort(function(a, b) {
            var aNumber = +a;
            var bNumber = +b;
            return aNumber > bNumber ? 1 : aNumber == bNumber ? 0 : -1;
        });

        var found;
        for (var i = 0; i < keys.length; i++) {
            var element = keys[i];
            if (stats[keys[i]].indexOf("a") >= 0 || stats[keys[i]].indexOf("y") >= 0) {
                found = keys[i];
                break;
            }
        }

        return found && found + "+";
    }
}