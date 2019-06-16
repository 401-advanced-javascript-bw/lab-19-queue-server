'use strict';

const QServer = require('@nmq/q/server');
QServer.start();

const files = new QServer('files');
files.monitorEvent('save');
files.monitorEvent('bad');

const database = new QServer('database');
database.monitorEvent('create');
database.monitorEvent('read');
database.monitorEvent('update');
database.monitorEvent('delete');
database.monitorEvent('bad');

console.log('server is up');
