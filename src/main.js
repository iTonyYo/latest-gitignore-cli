#!/usr/bin/env node

import Cli from './cli';

(async () => {
  const cli = new Cli();
  await cli.run();
})();
