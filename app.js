'use strict';
const QClient = require('@nmq/q/client');

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const read = file => readFile(file);
const uppercase = buffer => new Buffer.from(buffer.toString().toUpperCase());
const write = (file, buffer) => writeFile(file, buffer);

/**
 * reads file, turns content into uppercase then writes the file.
 * sends save or error notification when the events occur.
 * @param {*} file
 */
const alterFile = file => {
  return read(file)
    .then(buffer => uppercase(buffer))
    .then(uppercaseBuffer => write(file, uppercaseBuffer))
    .then(() => QClient.publish('files', 'save', 'file saved!'))
    .catch(() => QClient.publish('files', 'bad', 'error saving file'));
};
const FILE_PATH_INDEX = 2;
const file = process.argv[FILE_PATH_INDEX];
console.log(file);
// let file = process.argv.slice(2).shift();
alterFile(file);
