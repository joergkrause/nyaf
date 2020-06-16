#!/usr/bin/env node
// https://medium.com/northcoders/creating-a-project-generator-with-node-29e13b3cd309
const colors = require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const [, , ...args] = process.argv;

const CURR_DIR = process.cwd();

function copy(templatePath, newProjectPath, name, desc) {
  function createDirectoryContents(templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;

      // get stats about the current file
      const stats = fs.statSync(origFilePath);

      if (stats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');
        if (file === 'package.json') {
          const packageJson = JSON.parse(contents);
          packageJson.name = name.toLowerCase();
          packageJson.description = desc;
        }
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

        // recursive call
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      }
    });
  }
  createDirectoryContents(templatePath, newProjectPath);
}

console.log('Welcome to the command line!');
console.log('');
console.log('                                     __');
console.log('    ____                            / _|');
console.log('   / __ \\   _ __    _   _    __ _  | |_');
console.log('  / / _` | | \'_\\  | | | |  / _` | |  _|');
console.log(' | | (_| | | | | |  | |_| | | (_| | | |');
console.log(' \\  \__,_| |_| |_|  \\__,  | \\__, _| |_|');
console.log('  \\____/             __/ |');
console.log('                    |___/');
console.log('');
console.log('(C) JoergIsAGeek 2020');

if (!args || args.length < 1) {
  console.log('Available commands are:'.yellow.bold);
  console.log('n | --new: Create a new project'.bgWhite.black);
  console.log('g | --gen: Generate a component, service, expander, store'.bgWhite.black);
  console.log('h | --help [x]: Explain a single command in moder detail'.bgWhite.black);
  console.log('  For creating a new project:'.yellow);
  console.log('     nyaf n [template] [yourname] [options]'.bgWhite.black + ': Create in the current folder using template and name. Both parameters can be omitted, CLI will ask, then.'.white);
  console.log('  Available templates (use ONE of them): basic, store'.yellow);
  console.log('  Available options (use ANY of them): bootstrap, scss'.yellow);
  console.log('  For adding parts to an existing project:'.yellow);
  console.log('     nyaf g [template] [name]'.bgWhite.black + ': Create in the current project using template and name. Both parameters can be omitted, CLI will ask, then.');
  console.log('  Available templates (use ONE of them): c | component, s | service, e | expander, g | globalstore'.yellow);
  console.log('');
  console.log('The name may contain folder information'.yellow);
  return 0;
}

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-css',
    type: 'list',
    message: 'What style environment shall the project use?',
    choices: ['css', 'scss', 'bootstrap + css', 'bootstrap + scss']
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'project-desc',
    type: 'input',
    message: 'Description (optional):'
  },
  {
    name: 'project-install',
    type: 'confirm',
    message: 'Shall we execute "npm install" immediately?',
    default: true
  }
];

inquirer.prompt(QUESTIONS)
  .then(async answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const projectDesc = answers['project-desc'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    copy(templatePath, projectName, projectName, projectDesc);
    console.log('Creating ' + projectName + ' for you. Standby...');

    process.chdir(projectName);
    console.log('Install modules...');
    let res = await exec('npm i');
    if (res.stdout) {
      console.log(`Log output: ${res.stdout}`);
    }
    if (res.stderr) {
      console.error(`Errors: ${res.stderr}`);
    }
    // console.log('Build first time...');
    // res = await exec('npm run build');
    // if (res.stdout) {
    //   console.log(`Log output: ${res.stdout}`);
    // }
    // if (res.stderr) {
    //   console.error(`Error: ${res.stderr}`);
    // }
    console.log('Done. To continue:'.green);
    console.log('  ' + ('cd ' + projectName + '').bgWhite.black);
    console.log('  ' + 'npm start'.bgWhite.black);
    console.log('This will start the project with WebPack Dev Server on port 9000. ');
    console.log('Enjoy!'.blue);
    process.chdir('..');
  });
