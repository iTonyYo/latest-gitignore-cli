#!/usr/bin/env node
"use strict";

var _cli = _interopRequireDefault(require("./cli"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  const cli = new _cli.default();
  await cli.run();
})();