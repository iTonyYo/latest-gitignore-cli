import isEmpty from './utilities/isEmpty';

export default (twd) => ({
  twd: isEmpty(twd) ? process.cwd() : twd,
  cwd: process.cwd(),
});
