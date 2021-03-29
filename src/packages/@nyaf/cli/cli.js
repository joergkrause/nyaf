#!/usr/bin/env node
const colors = require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let [, , ...args] = process.argv;
args = args.map(a => a.startsWith("--") ? a.substr(2, 1) : a);

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

async function install(templatePath, projectName, projectDesc, executeInstall) {
  let pj = '';
  if (args[0] === 'x') {
    console.log('Creating ' + projectName + ' in current folder for you. Standby...');
    copy(templatePath, '.', projectName, projectDesc);
    pj = JSON.parse(fs.readFileSync('package.json'));
    pj.name = projectName;
    pj.description = projectDesc;
    pj.version = '0.0.1';
    fs.writeFileSync('package.json'), JSON.stringify(pj, 2);
  }
  if (args[0] === 'n') {
    console.log('Creating ' + projectName + ' in folder ' + projectName + ' for you. Standby...');
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    copy(templatePath, projectName, projectName, projectDesc);
    pj = JSON.parse(fs.readFileSync(path.join(`${CURR_DIR}/${projectName}`, 'package.json')));
    pj.name = projectName;
    pj.description = projectDesc;
    pj.version = '0.0.1';
    fs.writeFileSync(path.join(`${CURR_DIR}/${projectName}`, 'package.json'), JSON.stringify(pj, 2));
  }

  process.chdir(projectName);
  if (executeInstall) {
    console.log('Install modules...this will take a while');
    let res = await exec('npm i');
    if (res.stdout) {
      console.log(`Log output: ${res.stdout}`);
    }
    if (res.stderr) {
      console.error(`Errors: ${res.stderr}`);
    }
    console.log('Done. To continue:'.green);
    console.log('  ' + ('cd ' + projectName + '').bgWhite.black);
    console.log('  ' + 'npm start'.bgWhite.black);
    console.log('This will start the project with WebPack Dev Server on port 9000. ');
  } else {
    console.log('Please install node modules and look into "project.json" for available commands.')
  }
  console.log('Enjoy!'.blue);
  process.chdir('..');
}

console.log('Welcome to the @nyaf command line tool!');
console.log('');
console.log('                                     __');
console.log('    ____                            / _|');
console.log('   / __ \\   _ __    _   _    __ _  | |_');
console.log('  / / _` | | \'_  \\ | | | |  / _` | |  _|');
console.log(' | | (_| | | | | | | |_| | | (_| | | |');
console.log('  \\  \__,/  |_| |_|  \\__, |  \\__,_| |_|');
console.log('   \\____/            __/ |');
console.log('                    |___/');
console.log('');
console.log('(C) JoergIsAGeek 2018-2020');

if (!args || args.length < 1) {
  console.log('Available commands are:'.yellow.bold);
  console.log('n | --new: Create a new project in a new subfolder'.bgWhite.black);
  console.log('x | --new: Create a new project in current folder'.bgWhite.black);
  console.log('g | --gen: Generate a (c)omponent, (s)ervice, (e)xpander, (g)lobalstore, (d)irective'.bgWhite.black);
  console.log('h | --help [x]: Explain a single command in more detail'.bgWhite.black);
  console.log('  If you don\'t provide additional parameters, the CLI runs in interactive mode.'.green);
  console.log('  For creating a new project using parameters:'.yellow);
  console.log('     nyaf n [template] [yourname]'.bgWhite.black + ': Create in the current folder using template and name. Both parameters can be omitted, CLI will ask, then.'.white);
  console.log('  Available templates (use ONE of them): basic, full'.yellow);
  console.log('  Available options (use ANY of them): css, bootstrap, scss'.yellow);
  console.log('  For adding parts to an existing project:'.yellow);
  console.log('     nyaf g [template] [name]'.bgWhite.black + ': Create in the current project using template and name. Both parameters can be omitted, CLI will ask, then.');
  console.log('  Available templates (use ONE of them): c | component, s | service, e | expander, g | globalstore, d | directive'.yellow);
  console.log('');
  console.log('This tool is experimental and currently under construction. Use with caution. Feedback appreciated.'.red);
  console.log('');
  console.log('The name may contain folder information (choose one that matches both, folder and name validation)'.yellow);
  process.exit(1);
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

if (args[0] === 'x' || args[0] === 'n') {
  if (args[1] && args[2] && !args[3]) {
    console.log('No options provided, assume that installation install node modules immediately');
    args[3] = 'i';
  }
  if (args[1] && args[2] && args[3]) {
    // arguments
    const projectChoice = args[1];
    const projectName = args[2];
    const executeInstall = args[3].toLocaleLowerCase() == 'i';
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    console.log(`You create a new project with the name "${projectName}" of type "${projectChoice}".`);
    rl.question('Is that correct? (Y/n)', async (answer) => {
      if (!answer || answer.toLowerCase() === 'y') {
        await install(templatePath, projectName, '', executeInstall);
      }
      rl.close();
    });
  } else {
    // interactive
    inquirer.prompt(QUESTIONS)
      .then(async answers => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'].toLowerCase();
        const projectDesc = answers['project-desc'];
        const executeInstall = answers['project-install'];
        const templatePath = `${__dirname}/templates/${projectChoice}`;

        await install(templatePath, projectName, projectDesc, executeInstall);
      });
  }
}

function parseStringTemplate(str, obj) {
  let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/g);
  console.log(parts);
  let args = Array.from(str.matchAll(/\$\{((?!\d)[\wæøåÆØÅ]*?)\}/g));
  let parameters = args.map(argument => obj[argument[1]] || (obj[argument[1]] === undefined ? "" : obj[argument[1]]));
  return String.raw({ raw: parts }, ...parameters);
}

function checkNyaf(type, path) {
  if (fs.existsSync('package.json')) {
    try {
      const pjson = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' }));
      const check = Object.keys(pjson.dependencies).filter(k => k === '@nyaf/lib').shift();
      if (!check) {
        console.error('This is not a @nyaf project. Install @nyaf/lib first and setup a proper project structure.');
      }
      const tjson = JSON.parse(fs.readFileSync('tsconfig.json', { encoding: 'utf-8' }));
      const src = tjson['compilerOptions']['baseUrl'];
      if (!src) {
        console.error('tsconfig.json shall provide a baseUrl for the project to place code at.');
      }
      const targetPath = `${src}/${type}s/${path}`;
      console.log(`Ready to create the ${type} at ` + ('./' + targetPath).yellow);
      return targetPath;
    } catch (err) {
      console.error('Cannot access a valid package.json. Error: ' + err);
    }
  }
}

function askForName(type, name) {
  const p = new Promise((resolve, reject) => {
    if (name) {
      resolve(name);
    } else {
      rl.question(`What name shall the ${type} have? `, async (answer) => {
        if (answer) {
          resolve(answer);
        } else {
          reject('No name provided');
        }
        rl.close();
      });
    }
  });
  return p;
}

const genOptions = {
  'c': {
    type: 'component',
    pattern: '${name}.component.tsx',
    prompt: 'Creating a component',
    template: "import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';\r\n" +
      "\r\n" +
      "@CustomElement('app-${name}')\r\n" +
      "export class ${cname}Component extends BaseComponent<any> {\r\n" +
      "\r\n" +
      "  constructor() {\r\n" +
      "    super();\r\n" +
      "  }\r\n" +
      "\r\n" +
      "  render() {\r\n" +
      "    return (\r\n" +
      "      <div>\r\n" +
      "        Component created successfully!\r\n" +
      "      </div>\r\n" +
      "    );\r\n" +
      "  }\r\n" +
      "}\r\n"
  },
  's': {
    type: 'service',
    pattern: '${name}.service.ts',
    prompt: 'Creating a service'
  },
  'e': {
    type: 'expander',
    pattern: '${name}.expander.ts',
    prompt: 'Creating an expander'
  },
  'g': {
    type: 'globalstore',
    pattern: '${name}.store.ts',
    prompt: 'Creating a global store'
  },
  'd': {
    type: 'directive',
    pattern: '${name}.directive.ts',
    prompt: 'Creating a directive'
  }
}

function pascalCase(s) {
  return s.replace(/^.{1}/g, s[0].toUpperCase());
}

if (args[0] === 'g' && args[1]) {
  console.log(genOptions[args[1]].prompt.green);
  askForName(genOptions[args[1]].type, args[2])
    .then(name => {
      const interpolated = parseStringTemplate(genOptions[args[1]].pattern, { name });
      const targetPath = checkNyaf(genOptions[args[1]].type, interpolated);
      const template = parseStringTemplate(genOptions[args[1]].template, { cname: pascalCase(name), name });
      console.log(template);
      console.log('Not yet implemented'.red);
    })
    .catch(err => {
      console.log(err.red);
    });
}
