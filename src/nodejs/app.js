var express = require('express');
var http = require("http");
var fs = require("fs")

var app = express();

//boydy模块接收传递过来的post值;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


//中间层
app.all('/', function(req, res) {
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");	
	//接收post请求发送过来的参数;
	var username = req.body.username;
	var password =req.body.password;

	//一 nodejs专门写文件 记录日志;
	fs.readFile("log.txt", function(err, data) {
			//data.toString() 文件值;
			//console.log(req.query.name); req.query.name 为 laoxie;
			var content = data.toString() + '用户名:'+username + "   ";
			fs.writeFile("log.txt", content, function(err) {
			})
	});
//二 -------- 通信php 相当于node发送AJAX请求给PHP;---------------
	//php专门存数据库
	http.request({
	//http://localhost/exam/api/register.php
	hostname: 'localhost',
	port: '80',
	path: '/exam/api/register.php?username='+username+'&password='+password,
	method: 'GET'
	}, function(rea) {
		rea.setEncoding('utf8');
		var data = "";
		rea.on('data', function(chunk){//rea.on不是post请求的内容吗?也可以设为php传回来的参数吗
			data += chunk;	
		});
		rea.on('end', function(){	
			//php返回的值data  res.send=>将nodejs中的data返回给前端;
			//注意 :http.request请求中的rea同all中的res不是同一个值;
			//传递post请求参数给php; 服务器与服务器中一般用get请求;
			console.log(data);res.send(data);
		});
		
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	}).end();
//-----------------------------------------------------------------
	//res.send("1111");
	
})
app.listen(10086)