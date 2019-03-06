const fs = require('fs');
const colors = require('colors/safe');
const inquirer = require('inquirer');
const minimist = require('minimist');
const generateTasks = require('./lib/generateTasks');
const checkGitBranch = require('./lib/checkGitBranch');

const { folder, readMePath } = minimist(process.argv.slice(2));

const questions = [
  {
    type: 'input',
    name: 'clean_folder',
    message: 'Do you want to rebuild existing folder (all files inside will be DELETED)? y/n'
  }
];
console.log(readMePath);
fs.access(folder, err => {
  if (err) {
    const branch = checkGitBranch();
    if (branch === folder) {
      fs.mkdirSync(folder);
      generateTasks(folder, readMePath);
    } else {
      console.log(colors.red(`Check you git branch!\nCurrent branch: ${branch}\nThe branch should be: ${folder}`));
    }
  } else {
    console.log(colors.red.underline(`You already created the folder ${folder}`));
    inquirer.prompt(questions).then(answers => {
      if (answers.clean_folder.toLowerCase() === 'y') {
        generateTasks(folder, readMePath);
      }
    });
  }
});
