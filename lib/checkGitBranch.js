const fs = require('fs');

module.exports = () => {
  const gitHeadFile = fs.readFileSync('.git/HEAD');
  const match = /ref: refs\/heads\/([^\n]+)/.exec(gitHeadFile.toString());
  return match ? match[1] : null;
};
