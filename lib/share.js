"use strict";

var request = require("request");
var when = require("when");
var crypto = require("crypto");
var download = require("download");


var md5 = function(str){
	var instance = crypto.createHash('md5');
    instance.update(str);
    return instance.digest('hex');
}

var headers = {
	'Host': 'dl.vmall.com',
	'Connection': 'keep-alive',
	'Cache-Control': 'no-cache',
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	//'Accept-Encoding': 'gzip,deflate,sdch',
	'Cookie': '__utma=37538343.122829573.1388193293.1388193293.1388193293.1; __utmc=37538343; __utmz=37538343.1388193293.1.1.utmcsr=dl.vmall.com|utmccn=(referral)|utmcmd=referral|utmcct=/c0t5v6aphe; db_clicked=1; dbank_plugin=true; HOST_DBank=124.192.132.168; session=YuuuReKuTkNnUuaLaIUuaVuhjY1atkB5At6yntG5tCmL99CX; client=00b698d35a075603c1d535f6f3d41c0e; secret=fa8fe0f3a76a21a576a02b80611c1b3f; SID=54417831-82796221-2220430946; EID=1388293734-82796221-3696931395; login_type=sina; __utma=124949599.1609856858.1387593983.1388280841.1388284961.4; __utmb=124949599.3.10.1388284961; __utmc=124949599; __utmz=124949599.1388280841.3.3.utmcsr=tupian12345.com|utmccn=(referral)|utmcmd=referral|utmcct=/HTM/pic/AAAGIRL/2013/1228/24531.html; download_limit=false; r_trace_u=u54417831; pid=4',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36',
}

var base64 = {
	code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(){

	},
	decode: function(p, g){
		g = (typeof g == "undefined") ? false: g;
        var i, f, e, q, m, k, j, s, l = [],
        r,
        o;
        var h = this.code;
        o = g ? p.decodeUTF8() : p;
        for (var n = 0; n < o.length; n += 4) {
            q = h.indexOf(o.charAt(n));
            m = h.indexOf(o.charAt(n + 1));
            k = h.indexOf(o.charAt(n + 2));
            j = h.indexOf(o.charAt(n + 3));
            s = q << 18 | m << 12 | k << 6 | j;
            i = s >>> 16 & 255;
            f = s >>> 8 & 255;
            e = s & 255;
            l[n / 4] = String.fromCharCode(i, f, e);
            if (j == 64) {
                l[n / 4] = String.fromCharCode(i, f)
            }
            if (k == 64) {
                l[n / 4] = String.fromCharCode(i)
            }
        }
        r = l.join("");
        return g ? r.decodeUTF8() : r
	}
}
/**
 * 分享连接提取
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
var share = function(url){
	this.url = url;
	this.error = "";
}
share.prototype = {
	run: function(){
		var self = this;
		return this.getContent().then(function(content){
			var data = self.parseContent(content);
			if (!data) {
				return false;
			};
			var retcode = parseInt(data.retcode, 10);
			if (retcode > 0) {
				return false;
			};
			//只取第一个文件
			var encryKey = data.data.encryKey;
			var files = data.data.resource.files;
			if (files.length === 0) {
				return false;
			};
			return files.map(function(item){
				var downloadurl = item.downloadurl;
				return self.decrypt(downloadurl, encryKey);
			}).filter(function(item){
				return item;
			})
		})
	},
	decode_eb: function(h, l) {
        var k = [],
        e = 0,
        d,
        g = "";
        for (var f = 0; f < 256; f++) {
            k[f] = f
        }
        for (f = 0; f < 256; f++) {
            e = (e + k[f] + h.charCodeAt(f % h.length)) % 256;
            d = k[f];
            k[f] = k[e];
            k[e] = d
        }
        f = 0;
        e = 0;
        for (var m = 0; m < l.length; m++) {
            f = (f + 1) % 256;
            e = (e + k[f]) % 256;
            d = k[f];
            k[f] = k[e];
            k[e] = d;
            g += String.fromCharCode(l.charCodeAt(m) ^ k[(k[f] + k[e]) % 256])
        }
        return g
    },
	decode_ed: function(d, e) {
        var h = 0,
        g = "",
        k = e.length,
        f = d.length;
        for (; h < f; h++) {
            var j = d.charCodeAt(h) ^ e.charCodeAt(h % k);
            g += String.fromCharCode(j)
        }
        return g;
    },
	decrypt: function(downloadurl, encryKey){
		downloadurl = base64.decode(downloadurl);
		var url;
		var f = encryKey.substr(0, 2);
        switch (f) {
	        case "ea":
	            url = downloadurl;
	            break;
	        case "eb":
	            url = this.decode_ed(downloadurl, this.decode_eb(encryKey, encryKey));
	            break;
	        case "ed":
	            url = this.decode_ed(downloadurl, md5(encryKey));
	            break;
	        default:
	            url = downloadurl
        }
        return url;
	},
	/**
	 * 获取页面内容，返回一个promise
	 * @return {[type]} [description]
	 */
	getContent: function(){
		var deferred = when.defer();
		request({
			url: this.url,
			headers: headers
		}, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		    	deferred.resolve(body);
		  	}else{
		  		deferred.reject(error);
		  	}
		});
		return deferred.promise;
	},
	/**
	 * 解析内容，拿到关键数据对象
	 * @param  {[type]} content [description]
	 * @return {[type]}         [description]
	 */
	parseContent: function(content){
		var prefix = 'var globallinkdata = ';
		var pos = content.indexOf(prefix);
		content = content.substr(pos+prefix.length);
		pos = content.indexOf("</script>");
		content = content.substr(0, pos).trim();
		var length = content.length;
		if (content.substr(length - 1) == ';') {
			content = content.substr(0, length - 1);
		};
		try{
			return JSON.parse(content);
		}catch(e){
			return false;
		}
	}
}
module.exports = function(url){
	return (new share(url)).run();
}
/**
 * 下载文件
 * @param  {[type]} url  [description]
 * @param  {[type]} dest [description]
 * @return {[type]}      [description]
 */
module.exports.download = function(url, dest){
	download(url, dest, {
		headers: headers
	});
}