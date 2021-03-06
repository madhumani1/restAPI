const data = require('../data');
const port = process.env.PORT  || 4000;
/**
 * What is rest?
 * REST - REpresentation State Transfer.
 * A fancy way of saying that a server responds to
 * Create (POST), Read (GET), Update (PUT), Delete (DELETE) request using HTTP protocol.
 * The idea behind REST is to treat all server URLs as access point
 * for the various resources on the server.
 *
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
    // Handle GET
    if(req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'}); // hide this, see the font difference in browser
        //res.write('Hello World!'); //write a response to the client
        // add routes
        const routes=req.url;
        console.log('url: '+routes);
        const id = parseInt(routes.substring(routes.lastIndexOf('/')+1,routes.length));

        if(!isNaN(id)) {
            //const id = parseInt(routes.substring(routes.lastIndexOf('/')+1,routes.length));
            console.log(`id: ${id}`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            //res.write('Hello World!'); //write a response to the client
            console.log('length ',data.doctors.length);
            if(id <= data.doctors.length)  {
                res.write(JSON.stringify(data.doctors[id-1]));
            } else {
                res.write(`Id ${id} not found`);
            }
            res.end();
        } else if(routes.startsWith('/api/v1/doctors') === true) {
            const qry = url.parse(req.url, true).query;
            console.log('qry: ', qry);
            //console.log('qry.year: ', qry.year);
            //console.log('qry.id: ', qry.id);
            //console.log(JSON.stringify(data.doctors));
            // send json
            res.writeHead(200, {'Content-Type': 'application/json'});
            //res.write('Hello World!'); //write a response to the client
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
    }   else if(req.method === 'POST') {  // POST
        res.writeHead(200, {'Content-Type': 'application/json'});
        const routes=req.url;
        //var body = res.data.body;
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            //console.log('body: ',body);
        }).on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        const bodyJson = JSON.parse(body);
        console.log('body string: ',body);
        console.log('body name: ',bodyJson.name);
        const nextId = data.doctors.length+1;
        const doct = {id: nextId, name: bodyJson.name}
        data.doctors.push(doct);
        res.end();
        });

        /*console.log('name: ',body);
        console.log('url: '+routes);

        if(!body) {
            res.write('Doctor needs a new parameter');
        }
        const nextId = data.doctors.length + 1;
        const doctor = { id: nextId, body: body };

        data.doctors.push(doctor);
        res.write(JSON.stringify(data.doctors));
        res.end();*/
    }

}).listen(port, () => {
      console.log(`listening to port ${port}`);
  }); //the server object listens on port
