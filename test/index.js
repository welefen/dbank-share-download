var share = require("../index.js");
share("http://dl.vmall.com/c0436f5b6h").then(function(urls){
	if (urls !== false) {
		share.download(urls, "./1/").then(function(){
			console.log(222)
		})
	};
})