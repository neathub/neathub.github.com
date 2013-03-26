var https = require("https");
var request = require('request');
var http = require("http");
var url = require("url");
var querystring = require("querystring");


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
      // 'grant_type': 'authorization_code'
  };
  
  console.log(post_data);
  
  request.post(
      'https://github.com/login/oauth/access_token',
      // "http://requestb.in/129ofom1",
      { form: post_data},
      function (error, response, body) {
          
          //console.log(error);
          console.log(response.statusCode);
          console.log(body);
          
          if (!error && response.statusCode == 200) {
              console.log(body);
              
              res.writeHead(200);
              res.end(body + "\n");
          }
      }
  );
  
  // var options = {
  //     hostname: 'github.com',
  //     port: 80,
  //     path: '/login/oauth/access_token',
  //     method: 'POST',
  //     headers: {  
  //       'Content-Type': 'application/x-www-form-urlencoded',  
  //       'Content-Length': post_data.length  
  //     } 
  // };
  
  // console.log(options);
  
  // var req = https.request(options, function(res) {
//     res.setEncoding('utf8');
//     
//     var  data = ""
//     res.on('data', function (chunk) {
//         data += chunk;
//         console.log(chunk);
//     });
//   
//     res.on('end', function () {
//         response.writeHead(200);
//         response.end(data + "\n");
//     });
//     
//     req.on('error', function(e) {
//       console.log('problem with request: ' + e.message);
//     });
//     
//     // post the data
//     req.write(post_data);
//     req.end();
  // });
}).listen(8000);