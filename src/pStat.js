import fs from 'fs';
import { promisify } from 'util';

export default promisify(fs.stat);
