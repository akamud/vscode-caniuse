// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert';
import * as path from 'path';
var sinon = require('sinon'); // sinon.d.ts is broken ATM
import * as request from 'request';
import * as vscode from 'vscode';
import {CanIUse} from '../can-i-use';

let data = require("../../test-data/data.json");
sinon
    .stub(request, 'get')
    .yields(null, { statusCode: 200 }, data);

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

    test("Get property stats", () => {
        let canIUseExt = new CanIUse();
        let cssZoom = require("../../test-data/css-zoom.json");

        assert.equal(canIUseExt.getSupportStatus(cssZoom), "Can I Use: IE ✔ 5.5+ Firefox ✘ Chrome ✔ 4+ Safari ✔ 4+ Opera ✔ 15+");
    });

    test("Retrieve Information for invalid entries", (done) => {
        let canIUseExt = new CanIUse();

        canIUseExt.retrieveInformation("xyz", (result) => {
            assert.equal(result, "Can I Use: entry not found");
            done();
        });
    });
    
    test("Retrieve Information for well supported property", (done) => {
        let canIUseExt = new CanIUse();
       
        canIUseExt.retrieveInformation("border", (result) => {
            assert.equal(result, "Can I Use: All browsers ✔ (CSS 2.1 properties, well-supported subset)");
            done();
        });
    });
    
    test("Retrieve Information from caniuse.com", (done) => {
        let canIUseExt = new CanIUse();
       
        canIUseExt.retrieveInformation("css-zoom", (result) => {
            assert.equal(result, "Can I Use: IE ✔ 5.5+ Firefox ✘ Chrome ✔ 4+ Safari ✔ 4+ Opera ✔ 15+");
            done();
        });
    });
});
