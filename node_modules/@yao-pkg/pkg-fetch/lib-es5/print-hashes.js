"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expected_1 = require("./expected");
var utils_1 = require("./utils");
/* eslint-disable no-console */
function main() {
    for (var _i = 0, _a = Object.keys(expected_1.EXPECTED_HASHES).sort(utils_1.nodeBinarySortFunction); _i < _a.length; _i++) {
        var nodeVersion = _a[_i];
        console.log("".concat(expected_1.EXPECTED_HASHES[nodeVersion], " ").concat(nodeVersion));
    }
}
main();
//# sourceMappingURL=print-hashes.js.map