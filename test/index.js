var share = require("../index.js");
//含有目录
var url = "http://dl.dbank.com/c03rw9ft0g";
//含有多个文件
var url = "http://dl.dbank.com/c0zmjhb94m";
//单个文件
var url = "http://dl.dbank.com/c0s5q53e0a";
share.download("http://dl.dbank.com/c0s5q53e0a", "./1/").then(function(){
	console.log("下载完成");
}).otherwise(function(error){
	console.log(error);
})
