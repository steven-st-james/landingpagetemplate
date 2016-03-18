var StaticServer = require('static-server');

var server = new StaticServer({
  rootPath: 'dist/',
  port: 3000
});

server.start(function(){
  console.log('The server has started on: ' + server.port);
});
