// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';
import {CanIUse} from '../can-i-use';

suite("Can I Use Tests", () => {
        test("Get rule from dictionary", () => {
                let canIUseExt = new CanIUse();

                assert.equal(canIUseExt.getNormalizedRule("animation-name"), "css-animation");
        });

        test("Get word when rule is not in the dictionary", () => {
                let canIUseExt = new CanIUse();

                assert.equal(canIUseExt.getNormalizedRule("outline"), "outline");
        });

        test("Get rule from dictionary case insensitively", () => {
                let canIUseExt = new CanIUse();

                assert.equal(canIUseExt.getNormalizedRule("scaleZ"), "transforms3d");
        });

        test("Get well-supported property", () => {
                let canIUseExt = new CanIUse();

                assert.equal(canIUseExt.isWellSupported(canIUseExt.getNormalizedRule("background-color")), true);
        });

        test("New properties won't show as well supported", () => {
                let canIUseExt = new CanIUse();

                assert.equal(canIUseExt.isWellSupported(canIUseExt.getNormalizedRule("animation-name")), false);
        });
});
