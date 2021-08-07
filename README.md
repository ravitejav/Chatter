# Chatter

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/ravitejav/Chatter)

##### Chatter is a web application for chatting one-to-one and group chats


## Tech stacks:
- [ReactJS] (TypeScript is used)
- [Firebase Realtime Database] (Firebase Package is used)

## Features

- One to One chatting
- Group Chats

## Installation

Chatter requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies.

```sh
cd Chatter
npm i
```

To run in DEV environement...
```sh
npm run dev
```
In Dev env, port 4000 is used.

## Deploment
### &nbsp;&nbsp;&nbsp;GithubPages
- For github Pages deployment run &nbsp; ``` npm run deploy``` (not recommended)

### &nbsp;&nbsp;&nbsp;AutoDeploy
- By Merge PR to ```master``` with auto deploy to github pages

## PR CHECKS
- ```build-pull-request``` check is executed to verify build, after verification PR is allowed to merge 

   [ReactJS]: https://reactjs.org/docs/getting-started.html
   [Firebase Realtime Database]: https://firebase.google.com/products/realtime-database?gclsrc=ds&gclsrc=ds&gclid=CPL58KGVn_ICFRfBjgodoQgBeA
