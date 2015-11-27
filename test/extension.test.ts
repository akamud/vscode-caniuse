// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';
import {CanIUse} from '../extension';

suite("Can I Use Tests", () => {

        test("Get rule from dictionary", () => {
                let canIUseExt = new CanIUse();
                
                assert.equal(canIUseExt.getNormalizedRule("animation-name"), "css-animation");
        });
        
        test("Get word when rule is not in the dictionary", () => {
                let canIUseExt = new CanIUse();
                
                assert.equal(canIUseExt.getNormalizedRule("outline"), "outline");
        });
});