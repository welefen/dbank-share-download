## 介绍

华为网盘分享文件实际地址分析和下载，比如：分析 http://dl.vmall.com/c0436f5b6h 页面里分享的地址并可以自动下载里面的文件。

## 安装

```shell
npm install dbank-share-download
```

## 使用
```js
var share = require("dbank-share-download");
var url = "http://dl.vmall.com/c0436f5b6h";
share(url).then(function(urls){
	//urls为分析到的实际下载地址
	if (urls !== false) {
		//下载
		share.download(urls, "./1/").then(function(){
			console.log("下载完成")
		})
	};
})
```

