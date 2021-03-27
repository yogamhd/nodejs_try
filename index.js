const app = require('express').application;
const mysql = require('mysql');
const http = require('http');
const res = require('express').response;

mysql.originalCreateConnection = mysql.createConnection;
res.originalRedirect = res.redirect;

app.listen = function listen(port) {
  var server = http.createServer(this);
  return server.listen.apply(server, [3000]);
};

mysql.createConnection = function createConnection(config) {
  var _this = this;
  if (process.env.IDENTIFIER === 'ANSWER'){
    config.database = 'answer_' + config.database;
  }
  return mysql.originalCreateConnection.call(_this, config);
}

res.redirect = function redirect(url) {
  var _this = this;
  new_url = url + "?containerPort=3000&languageName=nodejs";
  return res.originalRedirect.call(_this, new_url);
};
