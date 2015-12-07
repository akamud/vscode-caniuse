// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';
import {CanIUse} from '../can-i-use';

suite("Can I Use Tests", () => {
        let canIUseExt : CanIUse;

        beforeEach(() => {
                canIUseExt = new CanIUse();
        });

        test("Get rule from dictionary", () => {
                assert.equal(canIUseExt.getNormalizedRule("animation-name"), "css-animation");
        });

        test("Get word when rule is not in the dictionary", () => {
                assert.equal(canIUseExt.getNormalizedRule("outline"), "outline");
        });

        test("Get rule from dictionary case insensitively", () => {
                assert.equal(canIUseExt.getNormalizedRule("scaleZ"), "transforms3d");
        });

        test("Get well-supported property", () => {
                assert.equal(canIUseExt.isWellSupported(canIUseExt.getNormalizedRule("background-color")), true);
        });

        test("New properties won't show as well supported", () => {
                assert.equal(canIUseExt.isWellSupported(canIUseExt.getNormalizedRule("animation-name")), false);
        });
});
