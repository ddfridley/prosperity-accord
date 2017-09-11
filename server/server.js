var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

let dir=__dirname.split('\\');
let initial=''; // because windows wants the absolute path to start with C:
if(dir.length===1) { dir=__dirname.split('/'); initial='/'; while(!dir[0]) dir.shift() }
console.info("dir:", dir);
dir[dir.length-1]='dist';
dir.push('demo');
console.info("running from",initial+dir.join('/'));

app.use(express.static(initial+dir.join('/')));

app.get('/', function(request, response) {
  response.redirect('/demo.html');
});

app.get('/*', (request, response)=>{
  console.info("Unexpected URL: ", request.protocol + '://'+ request.get('host')+ request.originalUrl);
  console.info("From:", request.headers['x-forwarded-for'] || request.connection.remoteAddress);
  response.redirect('/demo.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
