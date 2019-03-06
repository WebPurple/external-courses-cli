const fs = require('fs');
const colors = require('colors/safe');
const fileGeneration = require('./filesGeneration');

const tasksFromBuffer = str =>
  str
    .split('###')
    .filter(Boolean)
    .map(el => `/*\n${el.trim()}\n*/`);

module.exports = (folder, sourceFile) => {
  const namedFileGeneration = fileGeneration(n => `${folder}/Task${n}.js`);
  // proper file source
  const stream = fs.createReadStream(`node_modules/webpurple-external-courses/src/${sourceFile}/README.md`, {
    highWaterMark: 1 * 512
  });
  let buffer1 = '';
  let buffer2 = '';
  stream.on('data', chunk => {
    const str = chunk.toString();
    const correctPos = str.indexOf('###');
    if (buffer1 === '') {
      buffer1 = str.slice(correctPos);
    } else {
      buffer1 = buffer1.concat(str.slice(0, correctPos));
      buffer2 = str.slice(correctPos);
      namedFileGeneration(tasksFromBuffer(buffer1));
      buffer1 = buffer2;
    }
  });
  stream.on('end', () => {
    namedFileGeneration(tasksFromBuffer(buffer1));
    console.log(colors.green(`Files have been created in folder ${folder}`));
  });
};
