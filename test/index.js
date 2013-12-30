var share = require("../index.js");
//多个目录
var url1 = "http://dl.vmall.com/c0ukteanvy";
//含有一个目录
var url2 = "http://dl.vmall.com/c0k01h10pf";
//含有多个文件
var url3 = "http://dl.vmall.com/c0p5uqph2m";
//单个文件
var url4 = "http://dl.dbank.com/c0s5q53e0a";
share.download(url4, "./1/").then(function(){
	console.log("下载完成");
}).otherwise(function(error){
	console.log(error);
})