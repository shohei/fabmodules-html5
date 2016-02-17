'use strict';

//Express part
var express = require('express');
var expressApp = express();
var path = require('path');

expressApp.use(express.static(path.join(__dirname, '')));

var spawn = require('child_process').spawn;
var child = spawn('./mod_serve');
child.stdout.on('data', function(data) {
    console.log('child process stdout: ' + data);
});
child.stderr.on('data', function(data) {
    console.log('child process stdout: ' + data);
});
child.on('close', function(code) {
    console.log('child process closing: ' + code);
});

expressApp.listen(3344, function () {
  console.log('app listening on port 3344');
});

//Electron part
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

