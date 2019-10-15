var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + '/'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

var port = process.env.PORT || 5000;

app.listen(port);

console.log('Server started at port: ' + port);