#!/usr/bin/env node

const {execSync} = require('child_process')

const runCommand = command =>{
try{
    execSync(`${command}`,{stdio:'inherit'})
}
catch(e){
    console.error(`Failed to execute ${command}`,e);
    return false
}
return true
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/ShivanshVerma-coder/cra-for-extension ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`;

console.log('Setting up react extension app for you...')

const checkedOut = runCommand(gitCheckoutCommand)
if(!checkedOut) process.exit(-1);

console.log('Installing dependencies...')
const installedDeps = runCommand(installDepsCommand)
if(!installedDeps) process.exit(-1)

console.log('finalizing things')

console.log('Congratulations you are all set to go!!!')
