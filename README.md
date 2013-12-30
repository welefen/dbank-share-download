## 介绍

华为网盘分享页文件下载，比如：分析 http://dl.vmall.com/c0436f5b6h 页面里分享的文件地址并下载。

## 安装

```shell
npm install dbank-share-download
```

## 使用
```js
var share = require("dbank-share-download");
share.download("http://dl.dbank.com/c0s5q53e0a", "./1/").then(function(){
	console.log("下载完成");
}).otherwise(function(error){
	console.log(error);
})
```

share.download(url, dest);

url为华为网盘分享页的URL，dest文件下载后存放的目录。

## 其他

请求华为网盘里面的URL会带上如下的headers, 可以在调用download方法前根据需要修改。

```js
share.headers = {
	'Host': 'dl.vmall.com',
	'Connection': 'keep-alive',
	'Cache-Control': 'no-cache',
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Cookie': '__utma=37538343.122829573.1388193293.1388193293.1388193293.1; __utmc=37538343; __utmz=37538343.1388193293.1.1.utmcsr=dl.vmall.com|utmccn=(referral)|utmcmd=referral|utmcct=/c0t5v6aphe; db_clicked=1; dbank_plugin=true; HOST_DBank=124.192.132.168; session=YuuuReKuTkNnUuaLaIUuaVuhjY1atkB5At6yntG5tCmL99CX; client=00b698d35a075603c1d535f6f3d41c0e; secret=fa8fe0f3a76a21a576a02b80611c1b3f; SID=54417831-82796221-2220430946; EID=1388293734-82796221-3696931395; login_type=sina; __utma=124949599.1609856858.1387593983.1388280841.1388284961.4; __utmb=124949599.3.10.1388284961; __utmc=124949599; __utmz=124949599.1388280841.3.3.utmcsr=tupian12345.com|utmccn=(referral)|utmcmd=referral|utmcct=/HTM/pic/AAAGIRL/2013/1228/24531.html; download_limit=false; r_trace_u=u54417831; pid=4',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36',
}
```
