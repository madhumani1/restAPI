const data = require('../data');
const port = process.env.PORT  || 4000;
/**
 * Express.js is a web application framework for Node.js.
 * It provides various features that make web application development
 * fast and easy which otherwise takes more time using only Node.js.
 */

// do it old school - use http
// The HTTP module can create an HTTP server that listens to server
// ports and gives a response back to the client
const http = require('http');
var url = require('url');

//http.get('/api/v1/doctors',(req,res) => res.send('hello world'));

// create a server object:
// Use the createServer() method to create an HTTP server:
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'}); // hide this, see the font difference in browser
    //res.write('Hello World!'); //write a response to the client
    // add routes
    const routes=req.url;
    console.log('url: '+routes);
    if(routes.startsWith('/api/v1/doctors') === true) {
        const qry = url.parse(req.url, true).query;
        console.log('qry: ', qry);
        console.log('qry.year: ', qry.year);
        console.log('qry.id: ', qry.id);
        //console.log(JSON.stringify(data.doctors));
        // send json
        res.writeHead(200, {'Content-Type': 'application/json'});
        if(!isNaN(qry.id))  {
            console.log(data.doctors[qry.id-1]);
            res.write(JSON.stringify(data.doctors[qry.id-1]));
        } else {
            res.write(JSON.stringify(data.doctors));
        }

        res.end();
    } else {
        res.write('<h1>'+routes+'<br /></h1>');     // read and respond url branch
        const q = url.parse(req.url, true).query;
        const txt = q.year + " " + q.month;
        res.end(txt);
    }

}).listen(port, () => {
      console.log(`listening to port ${port}`);
  }); //the server object listens on port
