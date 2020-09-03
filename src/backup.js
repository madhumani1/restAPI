// A BASIC Node server
// Routing Requests

const http = require("http");
const url = require("url");

const server = http.createServer(function(req, res) {
  //console.log(req.url);
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  // parsedURL.pathname  parsedURL.query
  // standardize the requested url by removing any '/' at the start or end
  // '/folder/to/file/' becomes 'folder/to/file'
  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path);
  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();

  req.on("data", function() {
    console.log("got some data");
    //if no data is passed we don't see this messagee
    //but we still need the handler so the "end" function works.
  });
  req.on("end", function() {
    //request part is finished... we can send a response now
    console.log("send a response");
    //we will use the standardized version of the path
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method
    };
    //pass data incase we need info about the request
    //pass the response object because router is outside our scope
    route(data, res);
  });
});

server.listen(4001, function() {
  console.log("Listening on port 4001");
});

//define functions for the different Routes
//This object and the functions could be defined in another file that we import
//Each route has a function that takes two parameters
//data: the info about the request
//callback: the function to call to send the response
let routes = {
  kenny: function(data, res) {
    // this function called if the path is 'kenny'
    let payload = {
      name: "Kenny"
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  cartman: function(data, res) {
    // this function called if the path is 'cartman'
    let payload = {
      name: "Cartman"
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  "kenny/is/mysterion": function(data, res) {
    //this function called if path is 'kenny/is/mysterion'
    let payload = {
      name: "Mysterion",
      enemy: "The Coon",
      today: +new Date()
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  notFound: function(data, res) {
    //this one gets called if no route matches
    let payload = {
      message: "File Not Found",
      code: 404
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(404);

    res.write(payloadStr);
    res.end("\n");
  }
};
