# Can I Use
[![Build status](https://img.shields.io/travis/akamud/vscode-caniuse/master.svg)](https://travis-ci.org/akamud/vscode-caniuse) [![Coverage Status](https://coveralls.io/repos/akamud/vscode-caniuse/badge.svg?branch=master&service=github)](https://coveralls.io/github/akamud/vscode-caniuse?branch=master)  
Compatibility check for HTML5, CSS3, SVG, New JS API based on http://caniuse.com/ directly from Visual Studio Code

## Installing

This extension is available for free in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items/akamud.vscode-caniuse)  
```
ext install Can I Use
```

## Using

Just execute the command "Can I Use" and you will get the information about the selected term in your status bar.

The default keybinding is `ctrl+shift+i` on Windows/Linux and `ctrl+c` on Mac. You can override it with your custom settings.

## What's new?

**Version 0.5.3**  
* Support for CSS 2.1 properties
* Better support for partial matches using a [mapping file](https://github.com/akamud/vscode-caniuse/blob/master/data/rulesDictionary.json)
* Fix CSS Opacity and CSS Flexbox

## Screenshot

The result will be displayed in your status bar

![](https://raw.githubusercontent.com/akamud/vscode-caniuse/master/art/screenshot.png)

### Missing property?

I do my best to map all properties correctly to caniuse.com, but if you are getting an "entry not found" that shouldn't be there, please, raise an [issue](https://github.com/akamud/vscode-caniuse/issues) or a Pull Request and I'll fix it ASAP.

## Roadmap

* Configuration options

## License
[MIT License](https://raw.githubusercontent.com/akamud/vscode-caniuse/master/LICENSE)
