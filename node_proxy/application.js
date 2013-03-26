var request = require('request');
var http = require("http");
var url = require("url");

http.createServer(function (req, res) {
  var code = url.parse(req.url, true).query.code;
  
  if (req.url === "/favicon.ico"){
      res.writeHead(404);
      res.end("\n");
      return;
  }
  
  var post_data = {
      'code': code,
      'client_id': "537693f51fcdd92eb755",
      'client_secret': "10f913008f94e306428f71bcac9acebc76b07860",
      'scope': "user,public_repo"
  };
  
  request.post(
      'https://github.com/login/oauth/access_token',
      { form: post_data},
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
              
              var token = body.match(/access_token=([^&]*)/) ? body.match(/access_token=([^&]*)/)[1] : "";
              
              var headers = {};
              headers["Access-Control-Allow-Origin"] = "*";
              headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
              headers["Access-Control-Allow-Credentials"] = true;
              headers["Access-Control-Max-Age"] = '86400'; // 24 hours
              headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
              
              // respond to the request
              res.writeHead(200, headers);
              res.end(token);
          }
      }
  );
  
}).listen(80);