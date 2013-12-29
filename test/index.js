var share = require("../index.js");
share("http://dl.vmall.com/c0s6pdjc5l").then(function(urls){
	if (urls !== false) {
		console.log(urls);
		share.download(urls, "./1/");
	};
})