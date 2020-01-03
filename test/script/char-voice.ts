/**
 * Created by user on 2020/1/4.
 */

import charVoice from '../data/char-voice';
import { outputJSON, outputFile } from 'fs-extra';
import { path, rootDir } from '../_local-dev';

outputFile(path.join(rootDir, 'test/data', 'char-voice.txt'), charVoice.join('\n')+'\n');

