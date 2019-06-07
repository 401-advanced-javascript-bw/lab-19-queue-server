'use strict';
const QClient = require('@nmq/q/client');

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const read = file => readFile(file);
const uppercase = buffer => Buffer.from(buffer.toString().toUpperCase());
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
    .then(result => QClient.publish('files', 'save', Buffer.from(result)))
    .catch(err => QClient.publish('files', 'error', Buffer.from(err)));
};

let file = process.argv.slice(2).shift();
alterFile(file);
