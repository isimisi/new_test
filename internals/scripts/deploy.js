#!/usr/bin/env node

const shelljs = require('shelljs');
const animateProgress = require('./helpers/progress');
const chalk = require('chalk');
const addCheckMark = require('./helpers/checkmark');

const progress = animateProgress('Generating stats');

// Generate stats.json file with webpack
shelljs.exec(
  'npm run build',
  addCheckMark.bind(null, callback), // Output a checkmark on completion
);

// Called after webpack has finished generating the stats.json file
function callback() {
  clearInterval(progress);
  shelljs.exec(
    'now --prod',
    addCheckMark.bind(null, callback2),
  );
}

function callback() {
    shelljs.exec(
      'npm run build:clean'
    );
  }


