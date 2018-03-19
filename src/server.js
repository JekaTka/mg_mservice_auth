const App = require('./app');
const { port, env } = require('../config/vars');
// import mongoose from 'config/mongoose';

// open mongoose connection
// mongoose.connect();

var http = require('http');
var server = http.createServer(App);

server.listen(port, () => console.info(`server started on port ${port} (${env})`));

module.exports = server;
