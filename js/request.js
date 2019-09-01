var http=require('http')
var server=http.createServer((function(request,response)
{
	response.writeHead(200,
	{"Content-Type" : "text/plain"});
	response.end("Hello World\n");
}));
var request = require("request");
	request("http://www.google.com",function(error,response,body)
	{
		console.log(body);
	});
server.listen(7000);